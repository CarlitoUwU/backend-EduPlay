import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsUUID, Max, Min } from 'class-validator';
import { Emotion } from '@prisma/client';

export class CreateInteractionDto {
  @ApiProperty({ enum: Emotion, example: Emotion.POSITIVO })
  @IsEnum(Emotion)
  emotion: Emotion;

  @ApiProperty({ example: 8, description: 'Grade from 1-10' })
  @IsInt()
  @Min(1)
  @Max(10)
  grade: number;

  @ApiProperty({ example: 0.85, description: 'Engagement score 0-1' })
  @IsNumber()
  @Min(0)
  @Max(1)
  engagement: number;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsUUID()
  student_id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174002' })
  @IsUUID()
  activity_id: string;
}
