import { UserDto } from '@/modules/user/dto/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TeacherDto {
  id: string;

  @ApiProperty({
    description: 'The speciality of the teacher',
    example: 'Mathematics',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  specialty: string;

  assignedGrade: number;

  user: UserDto;
}
