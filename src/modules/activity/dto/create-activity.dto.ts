import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsDateString, IsUUID, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Título de la actividad/sesión',
    example: 'La Colonia en Perú (1532-1821)',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción detallada de la sesión para contexto de IA',
    example: 'Sesión sobre el período colonial en Perú, abarcando desde la conquista hasta la independencia',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Habilitar introducción conversacional con chatbot IA',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  hasIntroduction?: boolean;

  @ApiProperty({
    description: 'ID del enrollment (relación teacher-classroom-course)',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  @IsUUID()
  @IsNotEmpty()
  enrollment_id: string;

  @ApiProperty({
    description: 'Fecha y hora de inicio de la sesión (opcional)',
    example: '2025-10-28T09:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  start_time?: string;

  @ApiProperty({
    description: 'Fecha y hora de fin de la sesión',
    example: '2025-10-28T11:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  end_time: string;
}
