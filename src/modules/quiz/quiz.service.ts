import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizDto } from './dto/quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuizDto: CreateQuizDto): Promise<QuizDto> {
    const activity = await this.prisma.activity.findUnique({
      where: { id: createQuizDto.activity_id },
    });

    if (!activity) {
      throw new NotFoundException(
        `Actividad ${createQuizDto.activity_id} no encontrada`,
      );
    }

    // Crear el quiz con todas sus preguntas
    const quiz = await this.prisma.quiz.create({
      data: {
        activity_id: createQuizDto.activity_id,
        questions: createQuizDto.questions
          ? {
              create: createQuizDto.questions,
            }
          : undefined,
        questionsOpen: createQuizDto.questionsOpen
          ? {
              create: createQuizDto.questionsOpen,
            }
          : undefined,
        questionsAudio: createQuizDto.questionsAudio
          ? {
              create: createQuizDto.questionsAudio,
            }
          : undefined,
      },
      include: {
        questions: true,
        questionsOpen: true,
        questionsAudio: true,
      },
    });

    return quiz;
  }

  async findAll(): Promise<QuizDto[]> {
    return await this.prisma.quiz.findMany({
      include: {
        questions: true,
        questionsOpen: true,
        questionsAudio: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<QuizDto> {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
        questionsOpen: true,
        questionsAudio: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz ${id} no encontrado`);
    }

    return quiz;
  }

  async findByActivity(activityId: string): Promise<QuizDto | null> {
    return await this.prisma.quiz.findUnique({
      where: { activity_id: activityId },
      include: {
        questions: true,
        questionsOpen: true,
        questionsAudio: true,
      },
    });
  }

  async remove(id: string): Promise<QuizDto> {
    await this.findOne(id);

    return await this.prisma.quiz.delete({
      where: { id },
      include: {
        questions: true,
        questionsOpen: true,
        questionsAudio: true,
      },
    });
  }
}
