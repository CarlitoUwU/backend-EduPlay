import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ClassroomDto {
  @ApiProperty({
    description: 'Identificador único de la clase',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre de la clase',
    example: '5to Grado A',
  })
  @IsString()
  name: string;
}
