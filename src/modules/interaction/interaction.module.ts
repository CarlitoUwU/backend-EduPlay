import { Module } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [InteractionController],
  providers: [InteractionService, PrismaService],
  exports: [InteractionService],
})
export class InteractionModule {}
