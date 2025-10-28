import { ApiProperty } from '@nestjs/swagger';

export class FlashcardDto {
  @ApiProperty({ description: 'ID de la flashcard' })
  id: string;

  @ApiProperty({ description: 'Pregunta' })
  question: string;

  @ApiProperty({ description: 'Respuesta' })
  answer: string;

  @ApiProperty({ description: 'ID de la actividad' })
  activity_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}
