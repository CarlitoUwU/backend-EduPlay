import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateFlashcardDto {
  @ApiProperty({
    description: 'Pregunta de la flashcard',
    example: '¿Qué es la fotosíntesis?',
  })
  @IsString()
  question: string;

  @ApiProperty({
    description: 'Respuesta de la flashcard',
    example:
      'Proceso por el cual las plantas convierten luz solar en energía química',
  })
  @IsString()
  answer: string;

  @ApiProperty({
    description: 'ID de la actividad asociada',
    example: 'uuid-de-actividad',
  })
  @IsUUID()
  activity_id: string;
}

