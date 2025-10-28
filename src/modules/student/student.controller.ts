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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentDto } from './dto/student.dto';

@ApiTags('students')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created successfully', type: StudentDto })
  @ApiResponse({ status: 404, description: 'User or Classroom not found' })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students with optional filters' })
  @ApiQuery({ name: 'classroomId', required: false, description: 'Filter by classroom ID' })
  @ApiResponse({ status: 200, description: 'List of students', type: [StudentDto] })
  findAll(@Query('classroomId') classroomId?: string) {
    return this.studentService.findAll(classroomId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get student by user ID' })
  @ApiResponse({ status: 200, description: 'Student found', type: StudentDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findByUserId(@Param('userId') userId: string) {
    return this.studentService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID with full details' })
  @ApiResponse({ status: 200, description: 'Student found', type: StudentDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Get(':id/activities')
  @ApiOperation({ summary: 'Get all activities available for a student' })
  @ApiResponse({ status: 200, description: 'Student activities' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  getActivities(@Param('id') id: string) {
    return this.studentService.getActivities(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student' })
  @ApiResponse({ status: 200, description: 'Student updated successfully', type: StudentDto })
  @ApiResponse({ status: 404, description: 'Student not found' })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
