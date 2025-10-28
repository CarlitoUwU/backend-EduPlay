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
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({ status: 201, description: 'Teacher created successfully', type: TeacherDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
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
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher deleted successfully' })
  @ApiResponse({ status: 404, description: 'Teacher not found' })
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
