import {
  Controller,
  Get,
  Post,
  Body,
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
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentDto } from './dto/enrollment.dto';

@ApiTags('Enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo enrollment (relación teacher-classroom-course)',
  })
  @ApiResponse({
    status: 201,
    description: 'Enrollment creado correctamente',
    type: EnrollmentDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({
    status: 404,
    description: 'Teacher, Classroom o Course no encontrado',
  })
  create(
    @Body() createEnrollmentDto: CreateEnrollmentDto,
  ): Promise<EnrollmentDto> {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los enrollments' })
  @ApiQuery({
    name: 'teacherId',
    required: false,
    description: 'Filtrar enrollments por ID de docente',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de enrollments',
    type: [EnrollmentDto],
  })
  async findAll(
    @Query('teacherId') teacherId?: string,
  ): Promise<EnrollmentDto[]> {
    if (teacherId) {
      return this.enrollmentService.findByTeacher(teacherId);
    }
    return this.enrollmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un enrollment por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del enrollment',
  })
  @ApiResponse({
    status: 200,
    description: 'Enrollment encontrado con toda la información relacionada',
    type: EnrollmentDto,
  })
  @ApiResponse({ status: 404, description: 'Enrollment no encontrado' })
  findOne(@Param('id') id: string): Promise<EnrollmentDto> {
    return this.enrollmentService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un enrollment por su ID' })
  @ApiParam({
    name: 'id',
    description: 'UUID del enrollment a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Enrollment eliminado correctamente',
    type: EnrollmentDto,
  })
  @ApiResponse({ status: 404, description: 'Enrollment no encontrado' })
  remove(@Param('id') id: string): Promise<EnrollmentDto> {
    return this.enrollmentService.remove(id);
  }
}
