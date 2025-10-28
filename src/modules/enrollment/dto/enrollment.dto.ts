import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentDto {
  @ApiProperty({
    description: 'ID único del enrollment',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  id: string;

  @ApiProperty({
    description: 'ID del docente',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  teacher_id: string;

  @ApiProperty({
    description: 'ID del aula',
    example: 'c34d6e0a-67d4-6d2f-0e04-0d9d4c8b1g54',
  })
  classroom_id: string;

  @ApiProperty({
    description: 'ID del curso',
    example: 'd45e7f1b-78e5-7e3g-1f15-1e0e5d9c2h65',
  })
  course_id: string;
}
