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
import { PlayRelationService } from './play-relation.service';
import { CreatePlayRelationDto } from './dto/create-play-relation.dto';
import { UpdatePlayRelationDto } from './dto/update-play-relation.dto';
import { PlayRelationDto } from './dto/play-relation.dto';

@ApiTags('Play Relation - Juego de Relaciones')
@Controller('play-relation')
export class PlayRelationController {
  constructor(private readonly playRelationService: PlayRelationService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva relación manualmente' })
  @ApiResponse({
    status: 201,
    description: 'Relación creada',
    type: PlayRelationDto,
  })
  create(@Body() createPlayRelationDto: CreatePlayRelationDto) {
    return this.playRelationService.create(createPlayRelationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las relaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones',
    type: [PlayRelationDto],
  })
  findAll() {
    return this.playRelationService.findAll();
  }

  @Get('activity/:activityId')
  @ApiOperation({ summary: 'Obtener relaciones por actividad' })
  @ApiParam({ name: 'activityId', description: 'ID de la actividad' })
  @ApiResponse({
    status: 200,
    description: 'Relaciones de la actividad',
    type: [PlayRelationDto],
  })
  findByActivity(@Param('activityId') activityId: string) {
    return this.playRelationService.findByActivity(activityId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una relación por ID' })
  @ApiResponse({ status: 200, description: 'Relación', type: PlayRelationDto })
  findOne(@Param('id') id: string) {
    return this.playRelationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar relación' })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada',
    type: PlayRelationDto,
  })
  update(@Param('id') id: string, @Body() updatePlayRelationDto: UpdatePlayRelationDto) {
    return this.playRelationService.update(id, updatePlayRelationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar relación' })
  @ApiResponse({
    status: 200,
    description: 'Relación eliminada',
    type: PlayRelationDto,
  })
  remove(@Param('id') id: string) {
    return this.playRelationService.remove(id);
  }
}
