import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'SuperStudent123', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(5)
  @Max(18)
  age: number;

  @ApiProperty({ example: 6 })
  @IsInt()
  @Min(1)
  @Max(12)
  grade: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsUUID()
  classroom_id: string;
}
