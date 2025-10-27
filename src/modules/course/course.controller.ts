import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDto } from './dto/course.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo curso' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: 201,
    description: 'Curso creado correctamente',
    type: CourseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los cursos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de cursos obtenida exitosamente',
    type: [CourseDto],
  })
  findAll(): Promise<CourseDto[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del curso',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @ApiResponse({
    status: 200,
    description: 'Curso encontrado correctamente',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  findOne(@Param('id') id: string): Promise<CourseDto> {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un curso existente' })
  @ApiParam({
    name: 'id',
    description: 'UUID del curso a actualizar',
    example: 'd2a9b7e3-2d42-4f3b-9e31-3a4e9c9c2b10',
  })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({
    status: 200,
    description: 'Curso actualizado correctamente',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un curso por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del curso a eliminar',
    example: 'a9b3f4e5-6c7d-8e9f-0a1b-2c3d4e5f6a7b',
  })
  @ApiResponse({
    status: 200,
    description: 'Curso eliminado correctamente',
    type: CourseDto,
  })
  @ApiResponse({ status: 404, description: 'Curso no encontrado' })
  remove(@Param('id') id: string): Promise<CourseDto> {
    return this.courseService.remove(id);
  }
}
