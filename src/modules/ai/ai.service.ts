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
import { Emotion } from '@prisma/client';

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

      const aiGeneratedData = await response.json();

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
    } catch (error) {
      this.logger.error(`Error generando contenido IA: ${error.message}`);

      // Si n8n falla, generar contenido de fallback básico
      return this.generateFallbackContent(activityId, generateDto);
    }
  }

  /**
   * Guarda el contenido generado por la IA en la base de datos
   */
  private async saveGeneratedContent(
    activityId: string,
    aiData: any,
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
        data: aiData.flashcards.map((fc: any) => ({
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
        data: aiData.cardsMemory.map((cm: any) => ({
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
        data: aiData.playRelations.map((pr: any) => ({
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
          data: aiData.quiz.questions.map((q: any) => ({
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
          data: aiData.quiz.questionsOpen.map((q: any) => ({
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

      const result = await response.json();

      return {
        emotion: result.emotion as Emotion,
        engagement: result.engagement,
        analysis: result.analysis,
      };
    } catch (error) {
      this.logger.error(`Error en análisis de emoción: ${error.message}`);

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
}
