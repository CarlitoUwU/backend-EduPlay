<<<<<<< HEAD
import { PartialType } from '@nestjs/mapped-types';
=======
import { PartialType } from '@nestjs/swagger';
>>>>>>> feature/complete-backend-implementation
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
