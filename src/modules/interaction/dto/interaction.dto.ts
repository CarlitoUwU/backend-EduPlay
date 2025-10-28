import { ApiProperty } from '@nestjs/swagger';
import { Emotion } from '@prisma/client';

export class InteractionDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ enum: Emotion, example: Emotion.POSITIVO })
  emotion: Emotion;

  @ApiProperty({ example: 8, description: 'Grade from 1-10' })
  grade: number;

  @ApiProperty({ example: 0.85, description: 'Engagement score 0-1' })
  engagement: number;

  @ApiProperty({ example: '2025-10-27T19:30:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  student_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  activity_id: string;
}
