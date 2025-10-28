import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePlayRelationDto {
  @ApiProperty({
    description: 'Primer elemento a relacionar',
    example: 'Virrey',
  })
  @IsString()
  item1: string;

  @ApiProperty({
    description: 'Segundo elemento relacionado',
    example: 'Autoridad colonial en América',
  })
  @IsString()
  item2: string;

  @ApiProperty({
    description: 'ID de la actividad asociada',
    example: 'uuid-de-actividad',
  })
  @IsUUID()
  activity_id: string;
}
