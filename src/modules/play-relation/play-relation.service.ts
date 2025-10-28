import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreatePlayRelationDto } from './dto/create-play-relation.dto';
import { UpdatePlayRelationDto } from './dto/update-play-relation.dto';
import { PlayRelationDto } from './dto/play-relation.dto';

@Injectable()
export class PlayRelationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPlayRelationDto: CreatePlayRelationDto,
  ): Promise<PlayRelationDto> {
    const activity = await this.prisma.activity.findUnique({
      where: { id: createPlayRelationDto.activity_id },
    });

    if (!activity) {
      throw new NotFoundException(
        `Actividad ${createPlayRelationDto.activity_id} no encontrada`,
      );
    }

    return await this.prisma.playRelation.create({
      data: createPlayRelationDto,
    });
  }

  async findAll(): Promise<PlayRelationDto[]> {
    return await this.prisma.playRelation.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<PlayRelationDto> {
    const playRelation = await this.prisma.playRelation.findUnique({
      where: { id },
    });

    if (!playRelation) {
      throw new NotFoundException(`PlayRelation ${id} no encontrado`);
    }

    return playRelation;
  }

  async findByActivity(activityId: string): Promise<PlayRelationDto[]> {
    return await this.prisma.playRelation.findMany({
      where: { activity_id: activityId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(
    id: string,
    updatePlayRelationDto: UpdatePlayRelationDto,
  ): Promise<PlayRelationDto> {
    await this.findOne(id);

    return await this.prisma.playRelation.update({
      where: { id },
      data: updatePlayRelationDto,
    });
  }

  async remove(id: string): Promise<PlayRelationDto> {
    await this.findOne(id);

    return await this.prisma.playRelation.delete({
      where: { id },
    });
  }
}
