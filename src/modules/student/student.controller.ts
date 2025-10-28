import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StudentDto } from './dto/student.dto';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo estudiante',
    description:
      'Crea un nuevo estudiante junto con su usuario asociado (rol STUDENT) y lo asigna a un aula.',
  })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente.',
    type: StudentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o campos requeridos faltantes.',
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los estudiantes',
    description:
      'Obtiene una lista completa de los estudiantes registrados en el sistema.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de estudiantes obtenida correctamente.',
    type: [StudentDto],
  })
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un estudiante por su ID',
    description:
      'Devuelve la información detallada de un estudiante según su identificador único.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante',
    type: String,
    example: 'uuid-student',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado correctamente.',
    type: StudentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró un estudiante con el ID especificado.',
  })
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Buscar estudiante por ID de usuario',
    description:
      'Obtiene la información de un estudiante en función del ID de su usuario asociado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del usuario',
    type: String,
    example: 'uuid-user',
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado correctamente.',
    type: StudentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró un estudiante con el usuario especificado.',
  })
  findByUserId(@Param('id') id: string) {
    return this.studentService.findByUserId(id);
  }
}

/* @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  } */
