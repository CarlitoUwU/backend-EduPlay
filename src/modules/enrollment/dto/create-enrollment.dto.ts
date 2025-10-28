import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({
    description: 'ID del docente',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @IsUUID()
  @IsNotEmpty()
  teacher_id: string;

  @ApiProperty({
    description: 'ID del aula/clase',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  @IsUUID()
  @IsNotEmpty()
  classroom_id: string;

  @ApiProperty({
    description: 'ID del curso',
    example: 'c34d6e0a-67d4-6d2f-0e04-0d9d4c8b1g54',
  })
  @IsUUID()
  @IsNotEmpty()
  course_id: string;
}
