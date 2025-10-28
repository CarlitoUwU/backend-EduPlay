import { Emotion } from '@prisma/client';

export class ChatResponseDto {
  botResponse: string;
  emotion: Emotion;
  engagement: number;
  shouldContinue: boolean;
  conversationCount: number;
}
