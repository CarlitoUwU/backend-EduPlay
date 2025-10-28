import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The role of the user in the system',
    example: 'STUDENT',
    enum: Role,
    enumName: 'UserRole',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  role: string;
}
