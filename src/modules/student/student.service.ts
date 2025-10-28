import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PrismaService } from '@/prisma.service';
import { StudentDto } from './dto/student.dto';
import { Role } from 'prisma/generated';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    const user = await this.prismaService.user.create({
      data: {
        full_name: createStudentDto.full_name,
        email: createStudentDto.email,
        password: createStudentDto.password,
        role: Role.STUDENT,
      },
    });

    const student = await this.prismaService.student.create({
      data: {
        nickname: createStudentDto.nickname,
        age: createStudentDto.age,
        grade: createStudentDto.grade,
        classroom_id: createStudentDto.classroom_id,
        user_id: user.id,
      },
      include: {
        user: true,
        classroom: true,
      },
    });

    const studentDto: StudentDto = {
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

    return studentDto;
  }

  async findAll(): Promise<StudentDto[]> {
    const students = await this.prismaService.student.findMany({
      include: {
        user: true,
        classroom: true,
      },
    });

    return students.map((student) => ({
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
    }));
  }

  async findOne(id: string): Promise<StudentDto> {
    const student = await this.prismaService.student.findUnique({
      where: { id },
      include: {
        user: true,
        classroom: true,
      },
    });

    if (!student) {
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
      },
    });

    if (!student) {
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
}
