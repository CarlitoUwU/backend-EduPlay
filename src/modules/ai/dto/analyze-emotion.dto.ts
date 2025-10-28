import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max } from 'class-validator';
import { Emotion } from '@prisma/client';

export class AnalyzeEmotionDto {
  @ApiProperty({
    description: 'Texto o respuesta del estudiante para analizar',
    example: 'Me gustó mucho esta actividad, aprendí bastante',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Calificación del estudiante (0-10)',
    example: 8,
  })
  @IsNumber()
  @Min(0)
  @Max(10)
  grade: number;
}

export class EmotionAnalysisResponseDto {
  @ApiProperty({
    description: 'Emoción detectada',
    enum: ['POSITIVO', 'NEUTRAL', 'NEGATIVO'],
  })
  emotion: Emotion;

  @ApiProperty({
    description: 'Nivel de engagement calculado (0-1)',
    example: 0.85,
  })
  engagement: number;

  @ApiProperty({
    description: 'Análisis detallado de la IA',
    example: 'El estudiante muestra entusiasmo y comprensión del tema',
  })
  analysis: string;
}
