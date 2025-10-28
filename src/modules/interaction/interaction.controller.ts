import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { InteractionDto } from './dto/interaction.dto';

@ApiTags('interactions')
@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new interaction record' })
  @ApiResponse({ status: 201, description: 'Interaction created successfully', type: InteractionDto })
  @ApiResponse({ status: 404, description: 'Student or Activity not found' })
  create(@Body() createInteractionDto: CreateInteractionDto) {
    return this.interactionService.create(createInteractionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interactions with optional filters' })
  @ApiQuery({ name: 'studentId', required: false, description: 'Filter by student ID' })
  @ApiQuery({ name: 'activityId', required: false, description: 'Filter by activity ID' })
  @ApiResponse({ status: 200, description: 'List of interactions', type: [InteractionDto] })
  findAll(
    @Query('studentId') studentId?: string,
    @Query('activityId') activityId?: string,
  ) {
    return this.interactionService.findAll(studentId, activityId);
  }

  @Get('activity/:activityId/statistics')
  @ApiOperation({ summary: 'Get statistics for an activity' })
  @ApiResponse({ status: 200, description: 'Activity statistics' })
  getActivityStatistics(@Param('activityId') activityId: string) {
    return this.interactionService.getAveragesByActivity(activityId);
  }

  @Get('student/:studentId/statistics')
  @ApiOperation({ summary: 'Get statistics for a student' })
  @ApiResponse({ status: 200, description: 'Student statistics' })
  getStudentStatistics(@Param('studentId') studentId: string) {
    return this.interactionService.getStudentStatistics(studentId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an interaction by ID' })
  @ApiResponse({ status: 200, description: 'Interaction found', type: InteractionDto })
  @ApiResponse({ status: 404, description: 'Interaction not found' })
  findOne(@Param('id') id: string) {
    return this.interactionService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an interaction' })
  @ApiResponse({ status: 200, description: 'Interaction deleted successfully' })
  @ApiResponse({ status: 404, description: 'Interaction not found' })
  remove(@Param('id') id: string) {
    return this.interactionService.remove(id);
  }
}
