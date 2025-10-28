import {
  IsString,
  IsArray,
  IsUUID,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ConversationMessage {
  @ApiProperty({
    description: 'Rol de quien envía el mensaje',
    example: 'user',
    enum: ['user', 'bot'],
  })
  @IsString()
  @IsIn(['user', 'bot'], { message: 'El rol debe ser "user" o "bot"' })
  role: 'user' | 'bot';

  @ApiProperty({
    description: 'Contenido del mensaje',
    example: 'Hola, ¿cómo estás?',
  })
  @IsString()
  text: string;
}

export class ChatDto {
  @ApiProperty({
    description: 'ID del estudiante que envía el mensaje',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  student_id: string;

  @ApiProperty({
    description: 'ID de la actividad asociada al chat',
    example: '99eeb763-36c8-4d59-9afe-80199504f8cb',
  })
  @IsUUID()
  activity_id: string;

  @ApiProperty({
    description: 'Mensaje que envía el estudiante al bot',
    example: 'Explícame cómo ahorrar dinero.',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Historial completo de la conversación',
    type: [ConversationMessage],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessage)
  conversation_history: ConversationMessage[];
}
