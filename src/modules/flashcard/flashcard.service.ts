import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { FlashcardDto } from './dto/flashcard.dto';

@Injectable()
export class FlashcardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardDto> {
    // Verificar que la actividad existe
    const activity = await this.prisma.activity.findUnique({
      where: { id: createFlashcardDto.activity_id },
    });

    if (!activity) {
      throw new NotFoundException(
        `Actividad ${createFlashcardDto.activity_id} no encontrada`,
      );
    }

    return await this.prisma.flashcard.create({
      data: createFlashcardDto,
    });
  }

  async findAll(): Promise<FlashcardDto[]> {
    return await this.prisma.flashcard.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<FlashcardDto> {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { id },
    });

    if (!flashcard) {
      throw new NotFoundException(`Flashcard ${id} no encontrada`);
    }

    return flashcard;
  }

  async findByActivity(activityId: string): Promise<FlashcardDto[]> {
    return await this.prisma.flashcard.findMany({
      where: { activity_id: activityId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(
    id: string,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<FlashcardDto> {
    await this.findOne(id);

    return await this.prisma.flashcard.update({
      where: { id },
      data: updateFlashcardDto,
    });
  }

  async remove(id: string): Promise<FlashcardDto> {
    await this.findOne(id);

    return await this.prisma.flashcard.delete({
      where: { id },
    });
  }
}
