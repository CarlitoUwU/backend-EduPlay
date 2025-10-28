import { Module } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardController } from './flashcard.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [FlashcardController],
  providers: [FlashcardService, PrismaService],
  exports: [FlashcardService],
})
export class FlashcardModule {}
