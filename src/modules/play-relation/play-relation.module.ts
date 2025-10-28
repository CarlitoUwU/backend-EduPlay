import { Module } from '@nestjs/common';
import { PlayRelationService } from './play-relation.service';
import { PlayRelationController } from './play-relation.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  controllers: [PlayRelationController],
  providers: [PlayRelationService, PrismaService],
  exports: [PlayRelationService],
})
export class PlayRelationModule {}
