import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createActivityDto: CreateActivityDto): Promise<ActivityDto> {
    // Verificar que el enrollment existe
    const enrollment = await this.prismaService.enrollment.findUnique({
      where: { id: createActivityDto.enrollment_id },
    });

    if (!enrollment) {
      throw new NotFoundException(
        `Enrollment con ID ${createActivityDto.enrollment_id} no encontrado`,
      );
    }

    const activity = await this.prismaService.activity.create({
      data: {
        title: createActivityDto.title,
        description: createActivityDto.description,
        hasIntroduction: createActivityDto.hasIntroduction ?? true,
        enrollment_id: createActivityDto.enrollment_id,
        start_time: createActivityDto.start_time
          ? new Date(createActivityDto.start_time)
          : null,
        end_time: new Date(createActivityDto.end_time),
      },
    });

    return activity;
  }

  async findAll(): Promise<ActivityDto[]> {
    return await this.prismaService.activity.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<ActivityDto> {
    const activity = await this.prismaService.activity.findUnique({
      where: { id },
      include: {
        flashcards: true,
        cardsMemory: true,
        playRelations: true,
        extraMaterials: true,
        quiz: {
          include: {
            questions: true,
            questionsOpen: true,
            questionsAudio: true,
          },
        },
        enrollment: {
          include: {
            course: true,
            classroom: true,
            teacher: {
              include: {
                user: {
                  select: {
                    full_name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!activity) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }

    return activity;
  }

  async findByEnrollment(enrollmentId: string): Promise<ActivityDto[]> {
    return await this.prismaService.activity.findMany({
      where: { enrollment_id: enrollmentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityDto> {
    await this.findOne(id);

    const dataToUpdate: any = { ...updateActivityDto };

    if (updateActivityDto.start_time) {
      dataToUpdate.start_time = new Date(updateActivityDto.start_time);
    }

    if (updateActivityDto.end_time) {
      dataToUpdate.end_time = new Date(updateActivityDto.end_time);
    }

    return await this.prismaService.activity.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string): Promise<ActivityDto> {
    await this.findOne(id);

    return await this.prismaService.activity.delete({
      where: { id },
    });
  }

  async recentActivitiesByTeacher(teacherId: string) {
    console.log('teacherId en service:', teacherId);

    const activities = await this.prismaService.activity.findMany({
      where: {
        enrollment: {
          teacher_id: teacherId,
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        enrollment: {
          include: {
            course: true,
            classroom: true,
          },
        },
        flashcards: true,
        cardsMemory: true,
        playRelations: true,
        quiz: true,
        interactions: true,
      },
    });

    const formatted = activities.flatMap((activity) => {
      const baseData = {
        id: activity.id,
        title: activity.title,
        classroom: `${activity.enrollment.classroom.name} - ${activity.enrollment.course.name}`,
        date: activity.createdAt.toISOString().split('T')[0],
        enrollment_id: activity.enrollment_id,
      };

      const durationMinutes =
        activity.start_time && activity.end_time
          ? Math.round(
            (new Date(activity.end_time).getTime() -
              new Date(activity.start_time).getTime()) /
            60000,
          )
          : Math.floor(Math.random() * 30) + 15;

      const engagement =
        activity.interactions.length > 0
          ? Math.round(
            activity.interactions.reduce((a, i) => a + i.engagement, 0) /
            activity.interactions.length,
          )
          : Math.floor(Math.random() * 30) + 70;

      const completion = Math.floor(Math.random() * 20) + 80;

      const sharedData = {
        ...baseData,
        engagement,
        completion,
        duration: `${durationMinutes} min`,
      };

      const subactivities: any[] = [];

      if (activity.quiz) {
        subactivities.push({ ...sharedData, type: 'quiz' });
      }
      if (activity.flashcards.length > 0) {
        subactivities.push({ ...sharedData, type: 'flashcards' });
      }
      if (activity.cardsMemory.length > 0) {
        subactivities.push({ ...sharedData, type: 'memory' });
      }
      if (activity.playRelations.length > 0) {
        subactivities.push({ ...sharedData, type: 'relations' });
      }

      return subactivities;
    });

    return formatted;
  }

  async getUpcomingActivitiesByTeacher(teacherId: string) {
    console.log('teacherId (futuras):', teacherId);

    const now = new Date();

    // Buscamos actividades futuras asociadas al docente
    const activities = await this.prismaService.activity.findMany({
      where: {
        enrollment: {
          teacher_id: teacherId,
        },
        start_time: {
          gt: now, // solo futuras
        },
      },
      orderBy: { start_time: 'asc' },
      include: {
        enrollment: {
          include: {
            course: true,
            classroom: {
              include: {
                students: true,
              },
            },
          },
        },
      },
    });

    // Transformamos la información al formato deseado
    const formatted = activities.map((activity) => {
      const startTime = activity.start_time
        ? new Date(activity.start_time)
        : null;

      // Formato de fecha y hora
      const formattedDate = startTime
        ? startTime.toISOString().split('T')[0]
        : 'Sin fecha';
      const formattedTime = startTime
        ? startTime.toLocaleTimeString('es-PE', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        : 'Sin hora';

      return {
        id: activity.id,
        title: activity.title,
        classroom: `${activity.enrollment.classroom.name} - ${activity.enrollment.course.name}`,
        date: formattedDate,
        time: formattedTime,
        students: activity.enrollment.classroom.students?.length || 0,
        enrollment_id: activity.enrollment_id,
      };
    });

    return formatted;
  }
}
