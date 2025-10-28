import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { AiModule } from '@/modules/ai/ai.module';
import { FlashcardModule } from '@/modules/flashcard/flashcard.module';
import { CardsMemoryModule } from '@/modules/cards-memory/cards-memory.module';
import { PlayRelationModule } from '@/modules/play-relation/play-relation.module';
import { QuizModule } from '@/modules/quiz/quiz.module';
import { UserModule } from '@/modules/user/user.module';
import { HealthModule } from '@/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CourseModule,
    ClassroomModule,
    AuthModule,
    ActivityModule,
    EnrollmentModule,
    InteractionModule,
    StudentModule,
    TeacherModule,
    AiModule,
    FlashcardModule,
    CardsMemoryModule,
    PlayRelationModule,
    QuizModule,
    UserModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
