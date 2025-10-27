import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ClassroomDto } from './dto/classroom.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva clase' })
  @ApiBody({ type: CreateClassroomDto })
  @ApiResponse({
    status: 201,
    description: 'Clase creada correctamente',
    type: ClassroomDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(
    @Body() createClassroomDto: CreateClassroomDto,
  ): Promise<ClassroomDto> {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las clases' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clases obtenida exitosamente',
    type: [ClassroomDto],
  })
  findAll(): Promise<ClassroomDto[]> {
    return this.classroomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una clase por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la clase',
    example: 'f3b2c4d6-89a7-4e5f-9c8d-7a6b5c4d3e2f',
  })
  @ApiResponse({
    status: 200,
    description: 'Clase encontrada correctamente',
    type: ClassroomDto,
  })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  findOne(@Param('id') id: string): Promise<ClassroomDto> {
    return this.classroomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una clase existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la clase a actualizar',
    example: 'a12b34c5-d67e-890f-1a23-456b789c0d12',
  })
  @ApiBody({ type: UpdateClassroomDto })
  @ApiResponse({
    status: 200,
    description: 'Clase actualizada correctamente',
    type: ClassroomDto,
  })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ): Promise<ClassroomDto> {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una clase por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID de la clase a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Clase eliminada correctamente',
    type: ClassroomDto,
  })
  @ApiResponse({ status: 404, description: 'Clase no encontrada' })
  remove(@Param('id') id: string): Promise<ClassroomDto> {
    return this.classroomService.remove(id);
  }
}
