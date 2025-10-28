import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
<<<<<<< HEAD
import { PrismaService } from '@/prisma.service';
=======
import { PrismaService } from '../../prisma.service';
>>>>>>> feature/complete-backend-implementation

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, PrismaService],
<<<<<<< HEAD
=======
  exports: [TeacherService],
>>>>>>> feature/complete-backend-implementation
})
export class TeacherModule {}
