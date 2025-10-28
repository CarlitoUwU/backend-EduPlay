import { ApiProperty } from '@nestjs/swagger';

export class PlayRelationDto {
  @ApiProperty({ description: 'ID de la relación' })
  id: string;

  @ApiProperty({ description: 'Primer elemento' })
  item1: string;

  @ApiProperty({ description: 'Segundo elemento (relacionado)' })
  item2: string;

  @ApiProperty({ description: 'Si están relacionados' })
  isRelated: boolean;

  @ApiProperty({ description: 'ID de la actividad' })
  activity_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;
}
