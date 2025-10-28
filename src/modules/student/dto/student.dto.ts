import { ClassroomDto } from '@/modules/classroom/dto/classroom.dto';
import { UserDto } from '@/modules/user/dto/user.dto';

export class StudentDto {
  nickname?: string;
  age: number;
  grade: number;
  classroom: ClassroomDto;
  user: UserDto;
  risk_score: number;
  id: string;
  user_id: string;
  classroom_id: string;
}
