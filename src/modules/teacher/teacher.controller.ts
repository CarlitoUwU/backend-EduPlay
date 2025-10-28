import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo docente' })
  @ApiBody({ type: CreateTeacherDto })
  @ApiResponse({
    status: 201,
    description: 'Docente creado correctamente',
    type: TeacherDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherDto> {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los docentes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de docentes obtenida exitosamente',
    type: [TeacherDto],
  })
  findAll(): Promise<TeacherDto[]> {
    return this.teacherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un docente por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del docente',
    example: 'b3f8c7a9-4d12-4a6b-9e45-6f2d8b1e3c90',
  })
  @ApiResponse({
    status: 200,
    description: 'Docente encontrado correctamente',
    type: TeacherDto,
  })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  findOne(@Param('id') id: string): Promise<TeacherDto> {
    return this.teacherService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Obtener un docente por ID de usuario' })
  @ApiParam({
    name: 'id',
    description: 'UUID del usuario asociado al docente',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @ApiResponse({
    status: 200,
    description: 'Docente encontrado por ID de usuario',
    type: TeacherDto,
  })
  @ApiResponse({ status: 404, description: 'Docente no encontrado' })
  findByUserId(@Param('id') user_id: string): Promise<TeacherDto> {
    return this.teacherService.findByUserId(user_id);
  }
}

/* @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  } */
