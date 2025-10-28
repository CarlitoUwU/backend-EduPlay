import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from '@modules/course/course.module';
import { ClassroomModule } from '@/modules/classroom/classroom.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [CourseModule, ClassroomModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
