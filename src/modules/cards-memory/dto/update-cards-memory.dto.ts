import { PartialType } from '@nestjs/swagger';
import { CreateCardsMemoryDto } from './create-cards-memory.dto';

export class UpdateCardsMemoryDto extends PartialType(CreateCardsMemoryDto) {}
