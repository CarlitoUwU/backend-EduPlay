import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCardsMemoryDto {
  @ApiProperty({
    description: 'Primera carta del par',
    example: 'Hidrógeno',
  })
  @IsString()
  card1: string;

  @ApiProperty({
    description: 'Segunda carta del par (pareja)',
    example: 'H',
  })
  @IsString()
  card2: string;

  @ApiProperty({
    description: 'ID de la actividad asociada',
    example: 'uuid-de-actividad',
  })
  @IsUUID()
  activity_id: string;
}
