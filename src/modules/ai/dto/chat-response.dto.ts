import { ApiProperty } from '@nestjs/swagger';
import { Emotion } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  Min,
  Max,
  IsInt,
} from 'class-validator';

export class ChatResponseDto {
  @ApiProperty({
    description: 'Respuesta generada por el bot',
    example:
      'Para ahorrar dinero, primero debes planificar tu presupuesto mensual...',
  })
  @IsString()
  botResponse: string;

  @ApiProperty({
    description:
      'Emoción detectada en la respuesta o contexto de la conversación',
    enum: Emotion,
    example: Emotion.POSITIVO,
  })
  @IsEnum(Emotion)
  emotion: Emotion;

  @ApiProperty({
    description: 'Nivel de compromiso del estudiante con la actividad (0 a 1)',
    example: 0.85,
    minimum: 0,
    maximum: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  engagement: number;

  @ApiProperty({
    description: 'Indica si la conversación debe continuar',
    example: true,
  })
  @IsBoolean()
  shouldContinue: boolean;

  @ApiProperty({
    description: 'Número total de interacciones en la conversación actual',
    example: 5,
  })
  @IsInt()
  @Min(1)
  conversationCount: number;
}
