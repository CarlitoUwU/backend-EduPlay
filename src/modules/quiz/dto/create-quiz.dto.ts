import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsArray,
  ValidateNested,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsIn,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateQuestionDto {
  @ApiProperty({ example: '¿Cuál fue el primer virrey del Perú?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'Francisco Pizarro' })
  @IsString()
  @IsNotEmpty()
  optionA: string;

  @ApiProperty({ example: 'Blasco Núñez de Vela' })
  @IsString()
  @IsNotEmpty()
  optionB: string;

  @ApiProperty({ example: 'Diego de Almagro' })
  @IsString()
  @IsNotEmpty()
  optionC: string;

  @ApiProperty({ example: 'Pedro de la Gasca' })
  @IsString()
  @IsNotEmpty()
  optionD: string;

  @ApiProperty({
    example: 'B',
    description: 'Opción correcta (A, B, C o D)',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['A', 'B', 'C', 'D'], {
    message: 'La opción correcta debe ser A, B, C o D',
  })
  correctOption: string;
}

class CreateQuestionOpenDto {
  @ApiProperty({ example: 'Describe el impacto de la conquista española' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'Respuesta esperada sobre el impacto colonial' })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

class CreateQuestionAudioDto {
  @ApiProperty({ example: 'Escucha y responde' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    example: 'https://ejemplo.com/audio.mp3',
    description: 'URL del archivo de audio',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  audioUrl: string;

  @ApiProperty({ example: 'Respuesta del audio' })
  @IsString()
  @IsNotEmpty()
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
