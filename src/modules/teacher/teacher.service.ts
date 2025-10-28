import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    // Verify user exists and is a teacher
    const user = await this.prisma.user.findUnique({
      where: { id: createTeacherDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'TEACHER') {
      throw new Error('User must have TEACHER role');
    }

    return this.prisma.teacher.create({
      data: createTeacherDto,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        enrollments: {
          include: {
            classroom: true,
            course: true,
          },
        },
      },
      orderBy: {
        user: {
          full_name: 'asc',
        },
      },
    });
  }

  async findOne(id: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        },
        enrollments: {
          include: {
            classroom: {
              include: {
                students: {
                  include: {
                    user: {
                      select: {
                        full_name: true,
                      },
                    },
                  },
                },
              },
            },
            course: true,
            activities: {
              include: {
                interactions: true,
              },
            },
          },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }

  async findByUserId(userId: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        enrollments: {
          include: {
            classroom: true,
            course: true,
          },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found for this user');
    }

    return teacher;
  }

  async getDashboard(teacherId: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        enrollments: {
          include: {
            classroom: {
              include: {
                students: true,
              },
            },
            course: true,
            activities: {
              include: {
                interactions: {
                  include: {
                    student: {
                      include: {
                        user: {
                          select: {
                            full_name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    // Calculate statistics
    const totalEnrollments = teacher.enrollments.length;
    const totalClassrooms = new Set(
      teacher.enrollments.map((e) => e.classroom_id),
    ).size;
    const totalStudents = teacher.enrollments.reduce(
      (sum, e) => sum + e.classroom.students.length,
      0,
    );
    const totalActivities = teacher.enrollments.reduce(
      (sum, e) => sum + e.activities.length,
      0,
    );

    // Calculate interaction statistics
    const allInteractions = teacher.enrollments.flatMap((e) =>
      e.activities.flatMap((a) => a.interactions),
    );

    const averageGrade =
      allInteractions.length > 0
        ? allInteractions.reduce((sum, i) => sum + i.grade, 0) /
          allInteractions.length
        : 0;

    const averageEngagement =
      allInteractions.length > 0
        ? allInteractions.reduce((sum, i) => sum + i.engagement, 0) /
          allInteractions.length
        : 0;

    const emotionDistribution = allInteractions.reduce(
      (acc, i) => {
        acc[i.emotion] = (acc[i.emotion] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Get students at risk (high negative emotions or low engagement)
    const studentsAtRisk = teacher.enrollments
      .flatMap((e) =>
        e.classroom.students
          .filter((s) => s.risk_score > 5)
          .map((s) => ({
            student: s,
            classroom: e.classroom,
          })),
      );

    // Recent activities
    const recentActivities = teacher.enrollments
      .flatMap((e) => e.activities)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    return {
      teacher_id: teacherId,
      overview: {
        total_enrollments: totalEnrollments,
        total_classrooms: totalClassrooms,
        total_students: totalStudents,
        total_activities: totalActivities,
        students_at_risk: studentsAtRisk.length,
      },
      performance: {
        total_interactions: allInteractions.length,
        average_grade: Math.round(averageGrade * 100) / 100,
        average_engagement: Math.round(averageEngagement * 100) / 100,
        emotion_distribution: {
          POSITIVO: emotionDistribution['POSITIVO'] || 0,
          NEUTRAL: emotionDistribution['NEUTRAL'] || 0,
          NEGATIVO: emotionDistribution['NEGATIVO'] || 0,
        },
      },
      students_at_risk: await Promise.all(
        studentsAtRisk.map(async (item) => {
          const studentWithUser = await this.prisma.student.findUnique({
            where: { id: item.student.id },
            include: {
              user: {
                select: {
                  full_name: true,
                },
              },
            },
          });
          return {
            id: item.student.id,
            name: studentWithUser?.user.full_name || 'Unknown',
            risk_score: item.student.risk_score,
            classroom_id: item.student.classroom_id,
          };
        }),
      ),
      recent_activities: recentActivities.map((a) => ({
        id: a.id,
        title: a.title,
        created_at: a.createdAt,
        interactions_count: a.interactions.length,
      })),
      enrollments: teacher.enrollments.map((e) => ({
        id: e.id,
        course: e.course.name,
        classroom: e.classroom.name,
        students_count: e.classroom.students.length,
        activities_count: e.activities.length,
      })),
    };
  }

  async getClassroomStatistics(teacherId: string, classroomId: string) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: {
        teacher_id: teacherId,
        classroom_id: classroomId,
      },
      include: {
        classroom: {
          include: {
            students: {
              include: {
                user: {
                  select: {
                    full_name: true,
                  },
                },
                interactions: {
                  include: {
                    activity: true,
                  },
                },
              },
            },
          },
        },
        course: true,
        activities: {
          include: {
            interactions: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException(
        'Enrollment not found for this teacher and classroom',
      );
    }

    const students = enrollment.classroom.students;

    const studentStatistics = students.map((student) => {
      const studentInteractions = student.interactions;
      const avgGrade =
        studentInteractions.length > 0
          ? studentInteractions.reduce((sum, i) => sum + i.grade, 0) /
            studentInteractions.length
          : 0;
      const avgEngagement =
        studentInteractions.length > 0
          ? studentInteractions.reduce((sum, i) => sum + i.engagement, 0) /
            studentInteractions.length
          : 0;

      return {
        student_id: student.id,
        name: student.user.full_name,
        nickname: student.nickname,
        age: student.age,
        grade: student.grade,
        risk_score: student.risk_score,
        total_interactions: studentInteractions.length,
        average_grade: Math.round(avgGrade * 100) / 100,
        average_engagement: Math.round(avgEngagement * 100) / 100,
      };
    });

    return {
      classroom: {
        id: enrollment.classroom.id,
        name: enrollment.classroom.name,
      },
      course: {
        id: enrollment.course.id,
        name: enrollment.course.name,
      },
      total_students: students.length,
      total_activities: enrollment.activities.length,
      students: studentStatistics,
    };
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
