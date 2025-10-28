import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuestionDto {
  @ApiProperty({ example: '¿Cuál fue el primer virrey del Perú?' })
  question: string;

  @ApiProperty({ example: 'Francisco Pizarro' })
  optionA: string;

  @ApiProperty({ example: 'Blasco Núñez de Vela' })
  optionB: string;

  @ApiProperty({ example: 'Diego de Almagro' })
  optionC: string;

  @ApiProperty({ example: 'Pedro de la Gasca' })
  optionD: string;

  @ApiProperty({ example: 'B' })
  correctOption: string;
}

class CreateQuestionOpenDto {
  @ApiProperty({ example: 'Describe el impacto de la conquista española' })
  question: string;

  @ApiProperty({ example: 'Respuesta esperada sobre el impacto colonial' })
  answer: string;
}

class CreateQuestionAudioDto {
  @ApiProperty({ example: 'Escucha y responde' })
  question: string;

  @ApiProperty({ example: 'https://ejemplo.com/audio.mp3' })
  audioUrl: string;

  @ApiProperty({ example: 'Respuesta del audio' })
  answer: string;
}

export class CreateQuizDto {
  @ApiProperty({
    description: 'ID de la actividad asociada',
    example: 'uuid-de-actividad',
  })
  @IsUUID()
  activity_id: string;

  @ApiProperty({
    description: 'Preguntas de opción múltiple',
    type: [CreateQuestionDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @IsOptional()
  questions?: CreateQuestionDto[];

  @ApiProperty({
    description: 'Preguntas abiertas',
    type: [CreateQuestionOpenDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionOpenDto)
  @IsOptional()
  questionsOpen?: CreateQuestionOpenDto[];

  @ApiProperty({
    description: 'Preguntas de audio',
    type: [CreateQuestionAudioDto],
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionAudioDto)
  @IsOptional()
  questionsAudio?: CreateQuestionAudioDto[];
}

