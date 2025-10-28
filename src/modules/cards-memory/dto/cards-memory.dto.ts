import { ApiProperty } from '@nestjs/swagger';

export class CardsMemoryDto {
  @ApiProperty({ description: 'ID del par de memoria' })
  id: string;

  @ApiProperty({ description: 'Primera carta' })
  card1: string;

  @ApiProperty({ description: 'Segunda carta (pareja)' })
  card2: string;

  @ApiProperty({ description: 'Si el par está emparejado' })
  isMatched: boolean;

  @ApiProperty({ description: 'ID de la actividad' })
  activity_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}
