import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizDto } from './dto/quiz.dto';

@ApiTags('Quiz - Evaluaciones')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo quiz con preguntas' })
  @ApiResponse({
    status: 201,
    description: 'Quiz creado',
    type: QuizDto,
  })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los quizzes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de quizzes',
    type: [QuizDto],
  })
  findAll() {
    return this.quizService.findAll();
  }

  @Get('activity/:activityId')
  @ApiOperation({ summary: 'Obtener quiz por actividad' })
  @ApiParam({ name: 'activityId', description: 'ID de la actividad' })
  @ApiResponse({
    status: 200,
    description: 'Quiz de la actividad',
    type: QuizDto,
  })
  findByActivity(@Param('activityId') activityId: string) {
    return this.quizService.findByActivity(activityId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un quiz por ID' })
  @ApiResponse({ status: 200, description: 'Quiz', type: QuizDto })
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar quiz' })
  @ApiResponse({
    status: 200,
    description: 'Quiz eliminado',
    type: QuizDto,
  })
  remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }
}
