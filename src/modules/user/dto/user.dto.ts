import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Identificador único del usuario',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

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
    description: 'Rol del usuario en el sistema',
    example: 'STUDENT',
    enum: Role,
    enumName: 'UserRole',
  })
  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsEnum(Role, { message: 'El rol debe ser uno de los valores permitidos' })
  role: string;
}
