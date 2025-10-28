import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from '@modules/course/course.module';
import { ClassroomModule } from '@/modules/classroom/classroom.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ActivityModule } from '@/modules/activity/activity.module';
import { EnrollmentModule } from '@/modules/enrollment/enrollment.module';

@Module({
  imports: [
    CourseModule,
    ClassroomModule,
    AuthModule,
    ActivityModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
