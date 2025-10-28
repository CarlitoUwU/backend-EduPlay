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
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Carlo Valdivia Luna',
  })
  @IsString({ message: 'El nombre completo debe ser un texto válido' })
  full_name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'cvaldivialu@gmail.com',
  })
  @IsEmail({}, { message: 'El correo debe ser una dirección válida' })
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser un texto válido' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Rol del usuario en el sistema',
    example: 'STUDENT',
    enum: Role,
    enumName: 'UserRole',
  })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsEnum(Role, { message: 'El rol debe ser uno de los valores permitidos' })
  role: string;
}
