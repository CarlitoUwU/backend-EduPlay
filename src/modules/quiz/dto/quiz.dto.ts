import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({
    description: 'ID único de la pregunta',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  id: string;

  @ApiProperty({
    description: 'Texto de la pregunta',
    example: '¿Cuál fue el primer virrey del Perú?',
  })
  question: string;

  @ApiProperty({
    description: 'Primera opción de respuesta',
    example: 'Francisco Pizarro',
  })
  optionA: string;

  @ApiProperty({
    description: 'Segunda opción de respuesta',
    example: 'Blasco Núñez de Vela',
  })
  optionB: string;

  @ApiProperty({
    description: 'Tercera opción de respuesta',
    example: 'Diego de Almagro',
  })
  optionC: string;

  @ApiProperty({
    description: 'Cuarta opción de respuesta',
    example: 'Pedro de la Gasca',
  })
  optionD: string;

  @ApiProperty({
    description: 'Opción correcta (A, B, C o D)',
    example: 'B',
  })
  correctOption: string;

  @ApiProperty({
    description: 'ID del quiz al que pertenece',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  quiz_id: string;
}

export class QuestionOpenDto {
  @ApiProperty({
    description: 'ID único de la pregunta abierta',
    example: 'c34d6e0a-67d4-6d2f-0e04-0d9d4c8b1g54',
  })
  id: string;

  @ApiProperty({
    description: 'Texto de la pregunta abierta',
    example: 'Describe el impacto de la conquista española en el Perú',
  })
  question: string;

  @ApiProperty({
    description: 'Respuesta esperada o modelo',
    example:
      'La conquista española tuvo un impacto profundo en la cultura, economía y sociedad peruana...',
  })
  answer: string;

  @ApiProperty({
    description: 'ID del quiz al que pertenece',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  quiz_id: string;
}

export class QuestionAudioDto {
  @ApiProperty({
    description: 'ID único de la pregunta de audio',
    example: 'd45e7f1b-78e5-7e3g-1f15-1e0e5d9c2h65',
  })
  id: string;

  @ApiProperty({
    description: 'Texto de la pregunta de audio',
    example: 'Escucha el audio y responde qué personaje histórico habla',
  })
  question: string;

  @ApiProperty({
    description: 'URL del archivo de audio',
    example: 'https://eduplay.com/audios/historia-virreinato.mp3',
  })
  audioUrl: string;

  @ApiProperty({
    description: 'Respuesta esperada del audio',
    example: 'Virrey Blasco Núñez de Vela',
  })
  answer: string;

  @ApiProperty({
    description: 'ID del quiz al que pertenece',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  quiz_id: string;
}

export class QuizDto {
  @ApiProperty({
    description: 'ID único del quiz',
    example: 'e56f8g2c-89f6-8f4h-2g26-2f1f6e0d3i76',
  })
  id: string;

  @ApiProperty({
    description: 'ID de la actividad asociada',
    example: 'f67g9h3d-90g7-9g5i-3h37-3g2g7f1e4j87',
  })
  activity_id: string;

  @ApiProperty({
    description: 'Fecha y hora de creación del quiz',
    example: '2025-10-28T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Lista de preguntas de opción múltiple',
    type: [QuestionDto],
    required: false,
  })
  questions?: QuestionDto[];

  @ApiProperty({
    description: 'Lista de preguntas abiertas',
    type: [QuestionOpenDto],
    required: false,
  })
  questionsOpen?: QuestionOpenDto[];

  @ApiProperty({
    description: 'Lista de preguntas de audio',
    type: [QuestionAudioDto],
    required: false,
  })
  questionsAudio?: QuestionAudioDto[];
}
