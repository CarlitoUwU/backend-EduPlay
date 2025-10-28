import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'SuperStudent123', required: false })
  nickname?: string;

  @ApiProperty({ example: 12 })
  age: number;

  @ApiProperty({ example: 6 })
  grade: number;

  @ApiProperty({ example: 0 })
  risk_score: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  user_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  classroom_id: string;
}
