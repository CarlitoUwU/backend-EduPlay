import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class GenerateContentDto {
  @ApiProperty({
    description: 'Tema o contexto para generar el contenido',
    example: 'La Colonia en Perú',
  })
  @IsString()
  topic: string;

  @ApiProperty({
    description: 'Contexto adicional o descripción detallada',
    example: 'Periodo histórico entre 1532 y 1821',
    required: false,
  })
  @IsString()
  @IsOptional()
  context?: string;

  @ApiProperty({
    description: 'Cantidad mínima de elementos a generar por tipo',
    example: 3,
    default: 3,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  minItems?: number = 3;
}

export class GenerateContentResponseDto {
  @ApiProperty({ description: 'ID de la actividad' })
  activity_id: string;

  @ApiProperty({ description: 'Cantidad de flashcards generadas' })
  flashcardsCreated: number;

  @ApiProperty({ description: 'Cantidad de pares de memoria generados' })
  cardsMemoryCreated: number;

  @ApiProperty({ description: 'Cantidad de relaciones generadas' })
  playRelationsCreated: number;

  @ApiProperty({ description: 'Cantidad de preguntas de quiz generadas' })
  quizQuestionsCreated: number;

  @ApiProperty({ description: 'Estado de la generación' })
  status: 'success' | 'partial' | 'failed';

  @ApiProperty({ description: 'Mensaje descriptivo' })
  message: string;
}
