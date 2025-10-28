import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';

@Injectable()
export class InteractionService {
  constructor(private prisma: PrismaService) {}

  async create(createInteractionDto: CreateInteractionDto) {
    // Verify student exists
    const student = await this.prisma.student.findUnique({
      where: { id: createInteractionDto.student_id },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Verify activity exists
    const activity = await this.prisma.activity.findUnique({
      where: { id: createInteractionDto.activity_id },
    });
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return this.prisma.interaction.create({
      data: createInteractionDto,
      include: {
        student: {
          include: {
            user: {
              select: {
                full_name: true,
                email: true,
              },
            },
          },
        },
        activity: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async findAll(studentId?: string, activityId?: string) {
    const where: any = {};
    
    if (studentId) {
      where.student_id = studentId;
    }
    
    if (activityId) {
      where.activity_id = activityId;
    }

    return this.prisma.interaction.findMany({
      where,
      include: {
        student: {
          include: {
            user: {
              select: {
                full_name: true,
                email: true,
              },
            },
          },
        },
        activity: {
          select: {
            title: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const interaction = await this.prisma.interaction.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                full_name: true,
                email: true,
              },
            },
            classroom: true,
          },
        },
        activity: {
          include: {
            enrollment: {
              include: {
                teacher: {
                  include: {
                    user: {
                      select: {
                        full_name: true,
                      },
                    },
                  },
                },
                course: true,
              },
            },
          },
        },
      },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    return interaction;
  }

  async getAveragesByActivity(activityId: string) {
    const interactions = await this.prisma.interaction.findMany({
      where: { activity_id: activityId },
    });

    if (interactions.length === 0) {
      return {
        activity_id: activityId,
        total_interactions: 0,
        average_grade: 0,
        average_engagement: 0,
        emotion_distribution: {
          POSITIVO: 0,
          NEUTRAL: 0,
          NEGATIVO: 0,
        },
      };
    }

    const totalGrade = interactions.reduce((sum, i) => sum + i.grade, 0);
    const totalEngagement = interactions.reduce((sum, i) => sum + i.engagement, 0);
    
    const emotionCounts = interactions.reduce((acc, i) => {
      acc[i.emotion] = (acc[i.emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      activity_id: activityId,
      total_interactions: interactions.length,
      average_grade: totalGrade / interactions.length,
      average_engagement: totalEngagement / interactions.length,
      emotion_distribution: {
        POSITIVO: emotionCounts['POSITIVO'] || 0,
        NEUTRAL: emotionCounts['NEUTRAL'] || 0,
        NEGATIVO: emotionCounts['NEGATIVO'] || 0,
      },
    };
  }

  async getStudentStatistics(studentId: string) {
    const interactions = await this.prisma.interaction.findMany({
      where: { student_id: studentId },
      include: {
        activity: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (interactions.length === 0) {
      return {
        student_id: studentId,
        total_activities: 0,
        average_grade: 0,
        average_engagement: 0,
        recent_interactions: [],
      };
    }

    const totalGrade = interactions.reduce((sum, i) => sum + i.grade, 0);
    const totalEngagement = interactions.reduce((sum, i) => sum + i.engagement, 0);

    return {
      student_id: studentId,
      total_activities: interactions.length,
      average_grade: totalGrade / interactions.length,
      average_engagement: totalEngagement / interactions.length,
      recent_interactions: interactions.slice(0, 5),
    };
  }

  async remove(id: string) {
    const interaction = await this.prisma.interaction.findUnique({
      where: { id },
    });

    if (!interaction) {
      throw new NotFoundException('Interaction not found');
    }

    return this.prisma.interaction.delete({
      where: { id },
    });
  }
}
