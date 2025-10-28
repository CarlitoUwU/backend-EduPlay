<<<<<<< HEAD
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
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherDto } from './dto/teacher.dto';

@ApiTags('teachers')
>>>>>>> feature/complete-backend-implementation
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
<<<<<<< HEAD
  @ApiOperation({ summary: 'Registrar un nuevo docente' })
  @ApiBody({ type: CreateTeacherDto })
  @ApiResponse({
    status: 201,
    description: 'Docente creado correctamente',
    type: TeacherDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherDto> {
=======
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({ status: 201, description: 'Teacher created successfully', type: TeacherDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
>>>>>>> feature/complete-backend-implementation
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
<<<<<<< HEAD
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
=======
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({ status: 200, description: 'List of teachers', type: [TeacherDto] })
  findAll() {
    return this.teacherService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get teacher by user ID' })
  @ApiResponse({ status: 200, description: 'Teacher found', type: TeacherDto })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  findByUserId(@Param('userId') userId: string) {
    return this.teacherService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by ID with full details' })
  @ApiResponse({ status: 200, description: 'Teacher found', type: TeacherDto })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Get(':id/dashboard')
  @ApiOperation({ summary: 'Get teacher dashboard with comprehensive statistics' })
  @ApiResponse({ status: 200, description: 'Teacher dashboard data' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  getDashboard(@Param('id') id: string) {
    return this.teacherService.getDashboard(id);
  }

  @Get(':teacherId/classroom/:classroomId/statistics')
  @ApiOperation({ summary: 'Get detailed statistics for a specific classroom' })
  @ApiResponse({ status: 200, description: 'Classroom statistics' })
  @ApiResponse({ status: 404, description: 'Enrollment not found' })
  getClassroomStatistics(
    @Param('teacherId') teacherId: string,
    @Param('classroomId') classroomId: string,
  ) {
    return this.teacherService.getClassroomStatistics(teacherId, classroomId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher updated successfully', type: TeacherDto })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
>>>>>>> feature/complete-backend-implementation
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
<<<<<<< HEAD
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  } */
=======
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
>>>>>>> feature/complete-backend-implementation
