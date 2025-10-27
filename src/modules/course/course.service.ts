import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDto } from './dto/course.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return await this.prismaService.course.create({
      data: createCourseDto,
    });
  }

  async findAll(): Promise<CourseDto[]> {
    return await this.prismaService.course.findMany();
  }

  async findOne(id: string): Promise<CourseDto> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return await this.prismaService.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string): Promise<CourseDto> {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return await this.prismaService.course.delete({
      where: { id },
    });
  }
}
