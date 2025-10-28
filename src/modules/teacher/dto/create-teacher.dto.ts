import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

export class CreateTeacherDto {
  @ApiProperty({
    description: 'The full name of the user',
    example: 'John Doe',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password for the user account',
    example: 'SecurePassword123!',
    minLength: 6,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    example: 'student',
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: string;

  @ApiProperty({
    description: 'The speciality of the teacher',
    example: 'Mathematics',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  specialty: string;
}
