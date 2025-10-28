import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { ConfigService } from '@nestjs/config';
import {
  GenerateContentDto,
  GenerateContentResponseDto,
} from './dto/generate-content.dto';
import {
  AnalyzeEmotionDto,
  EmotionAnalysisResponseDto,
} from './dto/analyze-emotion.dto';
import { ChatDto } from './dto/chat.dto';
import { ChatResponseDto } from './dto/chat-response.dto';
import { Emotion } from '@prisma/client';
import {
  ActivityWithEnrollment,
  AIGeneratedData,
  CardsMemoryData,
  FlashcardData,
  PlayRelationData,
  QuestionData,
  QuestionOpenData,
} from './dto/others.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly n8nWebhookUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    // URL del webhook de n8n para generación de contenido
    this.n8nWebhookUrl =
      this.configService.get<string>('N8N_WEBHOOK_URL') ||
      'http://localhost:5678/webhook';
  }

  /**
   * Genera contenido educativo completo para una actividad usando IA
   * Llama a n8n que orquesta Ollama para generar todos los tipos de contenido
   */
  async generateContentForActivity(
    activityId: string,
    generateDto: GenerateContentDto,
  ): Promise<GenerateContentResponseDto> {
    this.logger.log(
      `Generando contenido IA para actividad: ${activityId}, tema: ${generateDto.topic}`,
    );

    // Verificar que la actividad existe
    const activity = await this.prisma.activity.findUnique({
      where: { id: activityId },
      include: { enrollment: { include: { course: true } } },
    });

    if (!activity) {
      throw new HttpException(
        `Actividad ${activityId} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // Llamar al webhook de n8n para generar contenido
      const response = await fetch(`${this.n8nWebhookUrl}/generate-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityId,
          topic: generateDto.topic,
          context: generateDto.context || activity.description,
          courseName: activity.enrollment.course.name,
          minItems: generateDto.minItems || 3,
        }),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.statusText}`);
      }

      const aiGeneratedData = (await response.json()) as AIGeneratedData;

      // Guardar contenido generado en la base de datos
      const result = await this.saveGeneratedContent(
        activityId,
        aiGeneratedData,
      );

      return {
        activity_id: activityId,
        ...result,
        status: 'success',
        message: 'Contenido generado exitosamente por IA',
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error generando contenido IA: ${errorMessage}`);

      // Si n8n falla, generar contenido de fallback básico
      return this.generateFallbackContent(activityId, generateDto);
    }
  }

  /**
   * Guarda el contenido generado por la IA en la base de datos
   */
  private async saveGeneratedContent(
    activityId: string,
    aiData: AIGeneratedData,
  ): Promise<{
    flashcardsCreated: number;
    cardsMemoryCreated: number;
    playRelationsCreated: number;
    quizQuestionsCreated: number;
  }> {
    let flashcardsCreated = 0;
    let cardsMemoryCreated = 0;
    let playRelationsCreated = 0;
    let quizQuestionsCreated = 0;

    // Guardar Flashcards
    if (aiData.flashcards && aiData.flashcards.length > 0) {
      await this.prisma.flashcard.createMany({
        data: aiData.flashcards.map((fc: FlashcardData) => ({
          question: fc.question,
          answer: fc.answer,
          activity_id: activityId,
        })),
      });
      flashcardsCreated = aiData.flashcards.length;
    }

    // Guardar CardsMemory (pares de memoria)
    if (aiData.cardsMemory && aiData.cardsMemory.length > 0) {
      await this.prisma.cardsMemory.createMany({
        data: aiData.cardsMemory.map((cm: CardsMemoryData) => ({
          card1: cm.card1,
          card2: cm.card2,
          activity_id: activityId,
        })),
      });
      cardsMemoryCreated = aiData.cardsMemory.length;
    }

    // Guardar PlayRelation (juego de relaciones)
    if (aiData.playRelations && aiData.playRelations.length > 0) {
      await this.prisma.playRelation.createMany({
        data: aiData.playRelations.map((pr: PlayRelationData) => ({
          item1: pr.item1,
          item2: pr.item2,
          activity_id: activityId,
        })),
      });
      playRelationsCreated = aiData.playRelations.length;
    }

    // Guardar Quiz con preguntas
    if (aiData.quiz?.questions) {
      // Crear el quiz
      const quiz = await this.prisma.quiz.create({
        data: {
          activity_id: activityId,
        },
      });

      // Crear preguntas múltiple opción
      if (aiData.quiz.questions.length > 0) {
        await this.prisma.question.createMany({
          data: aiData.quiz.questions.map((q: QuestionData) => ({
            question: q.question,
            optionA: q.optionA,
            optionB: q.optionB,
            optionC: q.optionC,
            optionD: q.optionD,
            correctOption: q.correctOption,
            quiz_id: quiz.id,
          })),
        });
        quizQuestionsCreated = aiData.quiz.questions.length;
      }

      // Crear preguntas abiertas si existen
      if (aiData.quiz.questionsOpen && aiData.quiz.questionsOpen.length > 0) {
        await this.prisma.questionOpen.createMany({
          data: aiData.quiz.questionsOpen.map((q: QuestionOpenData) => ({
            question: q.question,
            answer: q.answer,
            quiz_id: quiz.id,
          })),
        });
        quizQuestionsCreated += aiData.quiz.questionsOpen.length;
      }
    }

    return {
      flashcardsCreated,
      cardsMemoryCreated,
      playRelationsCreated,
      quizQuestionsCreated,
    };
  }

  /**
   * Genera contenido básico de fallback si n8n/Ollama no están disponibles
   */
  private async generateFallbackContent(
    activityId: string,
    generateDto: GenerateContentDto,
  ): Promise<GenerateContentResponseDto> {
    this.logger.warn('Generando contenido de fallback (sin IA)');

    const minItems = generateDto.minItems || 3;

    // Flashcards básicas
    await this.prisma.flashcard.createMany({
      data: Array.from({ length: minItems }, (_, i) => ({
        question: `¿Pregunta ${i + 1} sobre ${generateDto.topic}?`,
        answer: `Respuesta ${i + 1} sobre ${generateDto.topic}`,
        activity_id: activityId,
      })),
    });

    // Pares de memoria
    await this.prisma.cardsMemory.createMany({
      data: Array.from({ length: minItems }, (_, i) => ({
        card1: `Concepto ${i + 1}`,
        card2: `Definición ${i + 1}`,
        activity_id: activityId,
      })),
    });

    // Relaciones
    await this.prisma.playRelation.createMany({
      data: Array.from({ length: minItems }, (_, i) => ({
        item1: `Item A${i + 1}`,
        item2: `Item B${i + 1}`,
        activity_id: activityId,
      })),
    });

    // Quiz básico
    const quiz = await this.prisma.quiz.create({
      data: { activity_id: activityId },
    });

    await this.prisma.question.createMany({
      data: Array.from({ length: minItems }, (_, i) => ({
        question: `Pregunta ${i + 1}: ${generateDto.topic}`,
        optionA: 'Opción A',
        optionB: 'Opción B',
        optionC: 'Opción C',
        optionD: 'Opción D',
        correctOption: 'A',
        quiz_id: quiz.id,
      })),
    });

    return {
      activity_id: activityId,
      flashcardsCreated: minItems,
      cardsMemoryCreated: minItems,
      playRelationsCreated: minItems,
      quizQuestionsCreated: minItems,
      status: 'partial',
      message: 'Contenido generado sin IA (modo fallback)',
    };
  }

  /**
   * Analiza la emoción de un estudiante usando IA
   * Llama a n8n que usa Ollama para análisis de sentimiento
   */
  async analyzeEmotion(
    analyzeDto: AnalyzeEmotionDto,
  ): Promise<EmotionAnalysisResponseDto> {
    this.logger.log('Analizando emoción con IA');

    try {
      const response = await fetch(`${this.n8nWebhookUrl}/analyze-emotion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: analyzeDto.text,
          grade: analyzeDto.grade,
        }),
      });

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.statusText}`);
      }

      const result: EmotionAnalysisResponseDto =
        (await response.json()) as EmotionAnalysisResponseDto;

      return {
        emotion: result.emotion,
        engagement: result.engagement,
        analysis: result.analysis,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error en análisis de emoción: ${errorMessage}`);

      // Fallback: análisis básico por calificación
      return this.analyzeEmotionFallback(analyzeDto);
    }
  }

  /**
   * Análisis de emoción básico sin IA (fallback)
   */
  private analyzeEmotionFallback(
    analyzeDto: AnalyzeEmotionDto,
  ): EmotionAnalysisResponseDto {
    let emotion: Emotion;
    let engagement: number;

    if (analyzeDto.grade >= 8) {
      emotion = Emotion.POSITIVO;
      engagement = 0.8 + Math.random() * 0.2;
    } else if (analyzeDto.grade >= 5) {
      emotion = Emotion.NEUTRAL;
      engagement = 0.4 + Math.random() * 0.3;
    } else {
      emotion = Emotion.NEGATIVO;
      engagement = 0.1 + Math.random() * 0.3;
    }

    return {
      emotion,
      engagement: Number.parseFloat(engagement.toFixed(2)),
      analysis: `Análisis basado en calificación de ${analyzeDto.grade}/10`,
    };
  }

  /**
   * Procesa una conversación de chat con el estudiante durante la introducción
   * Genera respuestas contextuales y analiza la emoción del estudiante
   */
  async processChat(chatDto: ChatDto): Promise<ChatResponseDto> {
    this.logger.log(
      `Procesando chat para estudiante ${chatDto.student_id} en actividad ${chatDto.activity_id}`,
    );

    // 1. Obtener contexto de la actividad
    const activity = await this.prisma.activity.findUnique({
      where: { id: chatDto.activity_id },
      include: {
        enrollment: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!activity) {
      throw new HttpException(
        `Actividad ${chatDto.activity_id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. Verificar que el estudiante existe
    const student = await this.prisma.student.findUnique({
      where: { id: chatDto.student_id },
    });

    if (!student) {
      throw new HttpException(
        `Estudiante ${chatDto.student_id} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // 3. Llamar al webhook de n8n para generar respuesta conversacional
      const chatResponse = await fetch(`${this.n8nWebhookUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityTitle: activity.title,
          activityDescription: activity.description,
          courseName: activity.enrollment.course.name,
          studentMessage: chatDto.message,
          conversationHistory: chatDto.conversation_history,
        }),
      });

      if (!chatResponse.ok) {
        throw new Error(`n8n webhook error: ${chatResponse.statusText}`);
      }

      const parsed = (await chatResponse.json()) as { botResponse?: string };
      const botResponse =
        parsed.botResponse ??
        'Lo siento, no tuve respuesta del servicio de IA.';

      this.logger.log(`Respuesta del bot IA: ${botResponse}`);

      // 4. Analizar emoción del mensaje del estudiante
      const emotionAnalysis = await this.analyzeEmotion({
        text: chatDto.message,
        grade: 0, // No hay calificación en introducción
      });

      // 5. Crear registro de interacción
      const conversationCount = chatDto.conversation_history.length + 1;

      await this.prisma.interaction.create({
        data: {
          student_id: chatDto.student_id,
          activity_id: chatDto.activity_id,
          emotion: emotionAnalysis.emotion,
          engagement: emotionAnalysis.engagement,
          grade: 0, // Aún no hay calificación
        },
      });

      // 6. Determinar si debe continuar la conversación
      // Criterios: máximo 5 mensajes o engagement alto (>0.7)
      const shouldContinue =
        conversationCount < 5 && emotionAnalysis.engagement < 0.75;

      return {
        botResponse,
        emotion: emotionAnalysis.emotion,
        engagement: emotionAnalysis.engagement,
        shouldContinue,
        conversationCount,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      this.logger.error(`Error procesando chat: ${errorMessage}`);

      // Fallback: respuesta genérica
      return this.generateFallbackChatResponse(activity, chatDto);
    }
  }

  /**
   * Genera respuesta de chat de fallback sin IA
   */
  private generateFallbackChatResponse(
    activity: ActivityWithEnrollment,
    chatDto: ChatDto,
  ): ChatResponseDto {
    const conversationCount = chatDto.conversation_history.length + 1;

    const fallbackResponses = [
      `¡Hola! Vamos a aprender sobre ${activity.title}. ¿Qué te gustaría saber?`,
      `Interesante. Este tema es fascinante porque conecta con muchas cosas que usas cada día.`,
      `Perfecto, estás listo para comenzar. ¡Vamos a explorar juntos!`,
    ];

    const botResponse =
      fallbackResponses[Math.min(conversationCount - 1, 2)] ||
      fallbackResponses[0];

    return {
      botResponse,
      emotion: Emotion.NEUTRAL,
      engagement: 0.5,
      shouldContinue: conversationCount < 3,
      conversationCount,
    };
  }
}
