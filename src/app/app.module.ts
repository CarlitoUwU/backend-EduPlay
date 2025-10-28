import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from '@modules/course/course.module';
import { ClassroomModule } from '@/modules/classroom/classroom.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { ActivityModule } from '@/modules/activity/activity.module';
import { EnrollmentModule } from '@/modules/enrollment/enrollment.module';
import { InteractionModule } from '@/modules/interaction/interaction.module';
import { StudentModule } from '@/modules/student/student.module';
import { TeacherModule } from '@/modules/teacher/teacher.module';

@Module({
  imports: [
    CourseModule,
    ClassroomModule,
    AuthModule,
    ActivityModule,
    EnrollmentModule,
    InteractionModule,
    StudentModule,
    TeacherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
