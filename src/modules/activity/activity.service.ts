import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
