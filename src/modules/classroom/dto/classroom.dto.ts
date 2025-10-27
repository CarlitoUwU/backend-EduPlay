import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClassroomDto {
  @ApiProperty({
    description: 'Nombre de la clase',
    example: '5to Grado A',
  })
  @IsString()
  name: string;
}
