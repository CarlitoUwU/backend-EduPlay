import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateCardsMemoryDto } from './dto/create-cards-memory.dto';
import { UpdateCardsMemoryDto } from './dto/update-cards-memory.dto';
import { CardsMemoryDto } from './dto/cards-memory.dto';

@Injectable()
export class CardsMemoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCardsMemoryDto: CreateCardsMemoryDto,
  ): Promise<CardsMemoryDto> {
    const activity = await this.prisma.activity.findUnique({
      where: { id: createCardsMemoryDto.activity_id },
    });

    if (!activity) {
      throw new NotFoundException(
        `Actividad ${createCardsMemoryDto.activity_id} no encontrada`,
      );
    }

    return await this.prisma.cardsMemory.create({
      data: createCardsMemoryDto,
    });
  }

  async findAll(): Promise<CardsMemoryDto[]> {
    return await this.prisma.cardsMemory.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<CardsMemoryDto> {
    const cardsMemory = await this.prisma.cardsMemory.findUnique({
      where: { id },
    });

    if (!cardsMemory) {
      throw new NotFoundException(`CardsMemory ${id} no encontrado`);
    }

    return cardsMemory;
  }

  async findByActivity(activityId: string): Promise<CardsMemoryDto[]> {
    return await this.prisma.cardsMemory.findMany({
      where: { activity_id: activityId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(
    id: string,
    updateCardsMemoryDto: UpdateCardsMemoryDto,
  ): Promise<CardsMemoryDto> {
    await this.findOne(id);

    return await this.prisma.cardsMemory.update({
      where: { id },
      data: updateCardsMemoryDto,
    });
  }

  async remove(id: string): Promise<CardsMemoryDto> {
    await this.findOne(id);

    return await this.prisma.cardsMemory.delete({
      where: { id },
    });
  }
}
