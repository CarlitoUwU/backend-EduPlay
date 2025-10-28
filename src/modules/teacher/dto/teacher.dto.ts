import { ApiProperty } from '@nestjs/swagger';

export class TeacherDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Historia del Perú' })
  specialty: string;

  @ApiProperty({ example: 6 })
  assignedGrade: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  user_id: string;
}
