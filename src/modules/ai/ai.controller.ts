import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AiService } from './ai.service';
import {
  GenerateContentDto,
  GenerateContentResponseDto,
} from './dto/generate-content.dto';
import {
  AnalyzeEmotionDto,
  EmotionAnalysisResponseDto,
} from './dto/analyze-emotion.dto';

@ApiTags('AI - Inteligencia Artificial')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('generate-content/:activityId')
  @ApiOperation({
    summary: 'Generar contenido educativo con IA',
    description:
      'Genera automáticamente flashcards, juegos de memoria, relaciones y quiz usando Ollama a través de n8n',
  })
  @ApiParam({
    name: 'activityId',
    description: 'ID de la actividad para la cual generar contenido',
  })
  @ApiResponse({
    status: 201,
    description: 'Contenido generado exitosamente',
    type: GenerateContentResponseDto,
  })
  async generateContent(
    @Param('activityId') activityId: string,
    @Body() generateDto: GenerateContentDto,
  ): Promise<GenerateContentResponseDto> {
    return this.aiService.generateContentForActivity(activityId, generateDto);
  }

  @Post('analyze-emotion')
  @ApiOperation({
    summary: 'Analizar emoción del estudiante',
    description:
      'Analiza el texto y calificación del estudiante para determinar su estado emocional y nivel de engagement',
  })
  @ApiResponse({
    status: 201,
    description: 'Emoción analizada exitosamente',
    type: EmotionAnalysisResponseDto,
  })
  async analyzeEmotion(
    @Body() analyzeDto: AnalyzeEmotionDto,
  ): Promise<EmotionAnalysisResponseDto> {
    return this.aiService.analyzeEmotion(analyzeDto);
  }
}

