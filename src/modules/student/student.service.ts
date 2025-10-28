import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    // Verify user exists and is a student
    const user = await this.prisma.user.findUnique({
      where: { id: createStudentDto.user_id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'STUDENT') {
      throw new Error('User must have STUDENT role');
    }

    // Verify classroom exists
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: createStudentDto.classroom_id },
    });
    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return this.prisma.student.create({
      data: createStudentDto,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        classroom: true,
      },
    });
  }

  async findAll(classroomId?: string) {
    const where: any = {};
    
    if (classroomId) {
      where.classroom_id = classroomId;
    }

    return this.prisma.student.findMany({
      where,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        classroom: true,
      },
      orderBy: {
        user: {
          full_name: 'asc',
        },
      },
    });
  }

  async findOne(id: string) {
    const student = await this.prisma.student.findUnique({
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
        classroom: {
          include: {
            enrollments: {
              include: {
                course: true,
                teacher: {
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
        interactions: {
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
          take: 10,
        },
      },
    });

    if (!student) {
<<<<<<< HEAD
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return {
      id: student.id,
      nickname: student.nickname || undefined,
      age: student.age,
      grade: student.grade,
      risk_score: student.risk_score,
      user_id: student.user_id,
      classroom_id: student.classroom_id,
      user: {
        id: student.user.id,
        full_name: student.user.full_name,
        email: student.user.email,
        role: student.user.role,
      },
      classroom: {
        id: student.classroom.id,
        name: student.classroom.name,
      },
    };
  }

  async findByUserId(user_id: string): Promise<StudentDto> {
    const student = await this.prismaService.student.findUnique({
      where: { user_id },
      include: {
        user: true,
        classroom: true,
=======
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async findByUserId(userId: string) {
    const student = await this.prisma.student.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        classroom: {
          include: {
            enrollments: {
              include: {
                course: true,
              },
            },
          },
        },
>>>>>>> feature/complete-backend-implementation
      },
    });

    if (!student) {
<<<<<<< HEAD
      throw new NotFoundException(`Student with User ID ${user_id} not found`);
    }

    return {
      id: student.id,
      nickname: student.nickname || undefined,
      age: student.age,
      grade: student.grade,
      risk_score: student.risk_score,
      user_id: student.user_id,
      classroom_id: student.classroom_id,
      user: {
        id: student.user.id,
        full_name: student.user.full_name,
        email: student.user.email,
        role: student.user.role,
      },
      classroom: {
        id: student.classroom.id,
        name: student.classroom.name,
      },
    };
  }
  /* async update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(id: number) {
    return `This action removes a #${id} student`;
  } */
=======
      throw new NotFoundException('Student not found for this user');
    }

    return student;
  }

  async getActivities(studentId: string) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: {
        classroom: {
          include: {
            enrollments: {
              include: {
                activities: {
                  include: {
                    enrollment: {
                      include: {
                        course: true,
                        teacher: {
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
                    flashcards: true,
                    cardsMemory: true,
                    playRelations: true,
                    quiz: {
                      include: {
                        questions: true,
                        questionsOpen: true,
                        questionsAudio: true,
                      },
                    },
                    interactions: {
                      where: {
                        student_id: studentId,
                      },
                    },
                  },
                  orderBy: {
                    createdAt: 'desc',
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // Flatten activities from all enrollments
    const activities = student.classroom.enrollments.flatMap(
      (enrollment) => enrollment.activities,
    );

    return {
      student_id: studentId,
      total_activities: activities.length,
      activities,
    };
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
      include: {
        user: {
          select: {
            full_name: true,
            email: true,
            role: true,
          },
        },
        classroom: true,
      },
    });
  }

  async remove(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return this.prisma.student.delete({
      where: { id },
    });
  }
>>>>>>> feature/complete-backend-implementation
}
