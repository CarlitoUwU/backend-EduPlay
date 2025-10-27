import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CourseDto {
  @ApiProperty({
    description: 'Identificador único del curso',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Matemáticas Avanzadas',
  })
  @IsString()
  name: string;

  createdAt: Date;
}
