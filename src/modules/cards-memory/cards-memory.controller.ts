import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CardsMemoryService } from './cards-memory.service';
import { CreateCardsMemoryDto } from './dto/create-cards-memory.dto';
import { UpdateCardsMemoryDto } from './dto/update-cards-memory.dto';
import { CardsMemoryDto } from './dto/cards-memory.dto';

@ApiTags('Cards Memory - Juego de Memoria')
@Controller('cards-memory')
export class CardsMemoryController {
  constructor(private readonly cardsMemoryService: CardsMemoryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo par de cartas de memoria' })
  @ApiResponse({
    status: 201,
    description: 'Par creado',
    type: CardsMemoryDto,
  })
  create(@Body() createCardsMemoryDto: CreateCardsMemoryDto) {
    return this.cardsMemoryService.create(createCardsMemoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pares de memoria' })
  @ApiResponse({
    status: 200,
    description: 'Lista de pares',
    type: [CardsMemoryDto],
  })
  findAll() {
    return this.cardsMemoryService.findAll();
  }

  @Get('activity/:activityId')
  @ApiOperation({ summary: 'Obtener pares de memoria por actividad' })
  @ApiParam({ name: 'activityId', description: 'ID de la actividad' })
  @ApiResponse({
    status: 200,
    description: 'Pares de la actividad',
    type: [CardsMemoryDto],
  })
  findByActivity(@Param('activityId') activityId: string) {
    return this.cardsMemoryService.findByActivity(activityId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un par por ID' })
  @ApiResponse({ status: 200, description: 'Par', type: CardsMemoryDto })
  findOne(@Param('id') id: string) {
    return this.cardsMemoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar par de cartas' })
  @ApiResponse({
    status: 200,
    description: 'Par actualizado',
    type: CardsMemoryDto,
  })
  update(@Param('id') id: string, @Body() updateCardsMemoryDto: UpdateCardsMemoryDto) {
    return this.cardsMemoryService.update(id, updateCardsMemoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar par de cartas' })
  @ApiResponse({
    status: 200,
    description: 'Par eliminado',
    type: CardsMemoryDto,
  })
  remove(@Param('id') id: string) {
    return this.cardsMemoryService.remove(id);
  }
}
