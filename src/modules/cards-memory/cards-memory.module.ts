import { Module } from '@nestjs/common';
import { CardsMemoryService } from './cards-memory.service';
import { CardsMemoryController } from './cards-memory.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [CardsMemoryController],
  providers: [CardsMemoryService, PrismaService],
  exports: [CardsMemoryService],
})
export class CardsMemoryModule {}
