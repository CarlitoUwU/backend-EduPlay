import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivityDto } from './dto/activity.dto';

@ApiTags('Activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva actividad/sesión' })
  @ApiResponse({
    status: 201,
    description: 'Actividad creada correctamente',
    type: ActivityDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Enrollment no encontrado' })
  create(@Body() createActivityDto: CreateActivityDto): Promise<ActivityDto> {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las actividades' })
  @ApiQuery({
    name: 'enrollmentId',
    required: false,
    description: 'Filtrar actividades por ID de enrollment',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de actividades',
    type: [ActivityDto],
  })
  async findAll(
    @Query('enrollmentId') enrollmentId?: string,
  ): Promise<ActivityDto[]> {
    if (enrollmentId) {
      return this.activityService.findByEnrollment(enrollmentId);
    }
    return this.activityService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una actividad por su ID con todo el contenido',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la actividad',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @ApiResponse({
    status: 200,
    description: 'Actividad encontrada con flashcards, quiz, juegos, etc.',
    type: ActivityDto,
  })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  findOne(@Param('id') id: string): Promise<ActivityDto> {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una actividad existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la actividad a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Actividad actualizada correctamente',
    type: ActivityDto,
  })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ActivityDto> {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una actividad por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la actividad a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Actividad eliminada correctamente',
    type: ActivityDto,
  })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  remove(@Param('id') id: string): Promise<ActivityDto> {
    return this.activityService.remove(id);
  }

  @Get('recently/:teacherId')
  recentActivitiesByTeacher(@Param('teacherId') teacherId: string) {
    return this.activityService.recentActivitiesByTeacher(teacherId);
  }

  @Get('upcoming/:teacherId')
  getUpcomingActivitiesByTeacher(@Param('teacherId') teacherId: string) {
    return this.activityService.getUpcomingActivitiesByTeacher(teacherId);
  }
}
