import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  optionA: string;

  @ApiProperty()
  optionB: string;

  @ApiProperty()
  optionC: string;

  @ApiProperty()
  optionD: string;

  @ApiProperty()
  correctOption: string;

  @ApiProperty()
  quiz_id: string;
}

export class QuestionOpenDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  quiz_id: string;
}

export class QuestionAudioDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  audioUrl: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  quiz_id: string;
}

export class QuizDto {
  @ApiProperty({ description: 'ID del quiz' })
  id: string;

  @ApiProperty({ description: 'ID de la actividad' })
  activity_id: string;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Preguntas de opción múltiple', type: [QuestionDto] })
  questions?: QuestionDto[];

  @ApiProperty({ description: 'Preguntas abiertas', type: [QuestionOpenDto] })
  questionsOpen?: QuestionOpenDto[];

  @ApiProperty({ description: 'Preguntas de audio', type: [QuestionAudioDto] })
  questionsAudio?: QuestionAudioDto[];
}
