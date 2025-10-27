import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ClassroomDto } from './dto/classroom.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class ClassroomService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<ClassroomDto> {
    const classroom = await this.prismaService.classroom.create({
      data: createClassroomDto,
    });
    return classroom;
  }

  async findAll(): Promise<ClassroomDto[]> {
    return await this.prismaService.classroom.findMany();
  }

  async findOne(id: string): Promise<ClassroomDto> {
    const classroom = await this.prismaService.classroom.findUnique({
      where: { id },
    });

    if (!classroom) {
      throw new NotFoundException(`Clase con ID ${id} no encontrada`);
    }

    return classroom;
  }

  async update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<ClassroomDto> {
    await this.findOne(id);

    return await this.prismaService.classroom.update({
      where: { id },
      data: updateClassroomDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return await this.prismaService.classroom.delete({
      where: { id },
    });
  }
}
