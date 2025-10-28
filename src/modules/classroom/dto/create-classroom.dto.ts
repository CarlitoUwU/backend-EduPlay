import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({
    description: 'Nombre de la clase',
    example: '5to Grado A',
  })
  @IsString()
  name: string;
}
