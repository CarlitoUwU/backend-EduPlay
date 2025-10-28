import { IsString, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ConversationMessage {
  @IsString()
  role: string; // 'user' | 'bot'

  @IsString()
  text: string;
}

export class ChatDto {
  @IsUUID()
  student_id: string;

  @IsUUID()
  activity_id: string;

  @IsString()
  message: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversationMessage)
  conversation_history: ConversationMessage[];
}
