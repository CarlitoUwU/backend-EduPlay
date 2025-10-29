import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentDto } from './dto/enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(
    createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<EnrollmentDto> {
    // Verificar que existan las entidades relacionadas
    const [teacher, classroom, course] = await Promise.all([
      this.prismaService.teacher.findUnique({
        where: { id: createEnrollmentDto.teacher_id },
      }),
      this.prismaService.classroom.findUnique({
        where: { id: createEnrollmentDto.classroom_id },
      }),
      this.prismaService.course.findUnique({
        where: { id: createEnrollmentDto.course_id },
      }),
    ]);

    if (!teacher) {
      throw new NotFoundException(
        `Docente con ID ${createEnrollmentDto.teacher_id} no encontrado`,
      );
    }

    if (!classroom) {
      throw new NotFoundException(
        `Aula con ID ${createEnrollmentDto.classroom_id} no encontrada`,
      );
    }

    if (!course) {
      throw new NotFoundException(
        `Curso con ID ${createEnrollmentDto.course_id} no encontrado`,
      );
    }

    return await this.prismaService.enrollment.create({
      data: createEnrollmentDto,
    });
  }

  async findAll(): Promise<any[]> {
    const enrollments = await this.prismaService.enrollment.findMany({
      include: {
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
        classroom: {
          include: {
            students: {
              select: {
                id: true,
                grade: true,
              },
            },
          },
        },
        course: true,
      },
    });

    // Añadimos el conteo de estudiantes por clase y grados de los estudiantes
    const result = enrollments.map((enrollment) => {
      const totalStudents = enrollment.classroom.students.length;
      const grades = enrollment.classroom.students.map(
        (student) => student.grade,
      );
      const uniqueGrades = [...new Set(grades)].sort();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { students: _students, ...classroomWithoutStudents } =
        enrollment.classroom;

      return {
        ...enrollment,
        totalStudents,
        grades: uniqueGrades,
        classroom: classroomWithoutStudents,
      };
    });

    return result;
  }

  async findOne(id: string): Promise<EnrollmentDto> {
    const enrollment = await this.prismaService.enrollment.findUnique({
      where: { id },
      include: {
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
        classroom: {
          include: {
            students: {
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
        course: true,
        activities: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException(`Enrollment con ID ${id} no encontrado`);
    }

    return enrollment;
  }

  async findByTeacher(teacherId: string): Promise<any[]> {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: { teacher_id: teacherId },
      include: {
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
        classroom: {
          include: {
            students: {
              select: {
                id: true,
                grade: true,
              },
            },
          },
        },
        course: true,
      },
    });

    // Añadimos el conteo de estudiantes por clase y grados de los estudiantes
    const result = enrollments.map((enrollment) => {
      const totalStudents = enrollment.classroom.students.length;
      const grades = enrollment.classroom.students.map(
        (student) => student.grade,
      );
      const uniqueGrades = [...new Set(grades)].sort();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { students: _students, ...classroomWithoutStudents } =
        enrollment.classroom;

      return {
        ...enrollment,
        totalStudents,
        grades: uniqueGrades,
        classroom: classroomWithoutStudents,
      };
    });

    return result;
  }

  async remove(id: string): Promise<EnrollmentDto> {
    await this.findOne(id);

    return await this.prismaService.enrollment.delete({
      where: { id },
    });
  }
}
