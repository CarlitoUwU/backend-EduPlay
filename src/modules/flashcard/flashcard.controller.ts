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
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { FlashcardDto } from './dto/flashcard.dto';

@ApiTags('Flashcards')
@Controller('flashcard')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva flashcard manualmente' })
  @ApiResponse({
    status: 201,
    description: 'Flashcard creada',
    type: FlashcardDto,
  })
  create(@Body() createFlashcardDto: CreateFlashcardDto) {
    return this.flashcardService.create(createFlashcardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las flashcards' })
  @ApiResponse({
    status: 200,
    description: 'Lista de flashcards',
    type: [FlashcardDto],
  })
  findAll() {
    return this.flashcardService.findAll();
  }

  @Get('activity/:activityId')
  @ApiOperation({ summary: 'Obtener flashcards por actividad' })
  @ApiParam({ name: 'activityId', description: 'ID de la actividad' })
  @ApiResponse({
    status: 200,
    description: 'Flashcards de la actividad',
    type: [FlashcardDto],
  })
  findByActivity(@Param('activityId') activityId: string) {
    return this.flashcardService.findByActivity(activityId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una flashcard por ID' })
  @ApiResponse({ status: 200, description: 'Flashcard', type: FlashcardDto })
  findOne(@Param('id') id: string) {
    return this.flashcardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar flashcard' })
  @ApiResponse({
    status: 200,
    description: 'Flashcard actualizada',
    type: FlashcardDto,
  })
  update(@Param('id') id: string, @Body() updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardService.update(id, updateFlashcardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar flashcard' })
  @ApiResponse({
    status: 200,
    description: 'Flashcard eliminada',
    type: FlashcardDto,
  })
  remove(@Param('id') id: string) {
    return this.flashcardService.remove(id);
  }
}
