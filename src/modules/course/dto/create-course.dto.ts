import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Nombre del curso',
    example: 'Matemáticas Avanzadas',
  })
  @IsNotEmpty({ message: 'El nombre del curso es requerido' })
  @IsString({ message: 'El nombre del curso debe ser una cadena de texto' })
  name: string;
}
