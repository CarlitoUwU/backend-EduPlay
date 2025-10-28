import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';
import { PrismaService } from '@/prisma.service';
import { Role } from 'prisma/generated';

@Injectable()
export class TeacherService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherDto> {
    const user = await this.prismaService.user.create({
      data: {
        full_name: createTeacherDto.full_name,
        email: createTeacherDto.email,
        password: createTeacherDto.password,
        role: Role.TEACHER,
      },
    });

    const teacher = await this.prismaService.teacher.create({
      data: {
        specialty: createTeacherDto.specialty,
        assignedGrade: 2,
        user_id: user.id,
      },
      include: {
        user: true,
      },
    });

    return teacher;
  }

  async findAll(): Promise<TeacherDto[]> {
    return await this.prismaService.teacher.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string): Promise<TeacherDto> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  async findByUserId(user_id: string): Promise<TeacherDto> {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { user_id },
      include: { user: true },
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with User ID ${user_id} not found`);
    }
    return teacher;
  }

  /* async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  async remove(id: string) {
    return `This action removes a #${id} teacher`;
  } */
}
