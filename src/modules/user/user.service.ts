import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma.service';
import { UserDto } from './dto/user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prismaService.user.create({
      data: { ...createUserDto, role: createUserDto.role as Role },
    });
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User con ID ${id} no encontrado`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findOne(id);

    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        role: updateUserDto.role
          ? (updateUserDto.role as Role)
          : (user.role as Role),
      },
    });
  }

  async remove(id: string): Promise<UserDto> {
    await this.findOne(id);

    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
