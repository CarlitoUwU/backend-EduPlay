import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './create-activity.dto';
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @ApiProperty({
    description: 'Título de la actividad/sesión',
    example: 'La Colonia en Perú - Actualizado',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Descripción de la sesión',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Habilitar/deshabilitar introducción',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  hasIntroduction?: boolean;

  @ApiProperty({
    description: 'Nueva fecha de inicio',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  start_time?: string;

  @ApiProperty({
    description: 'Nueva fecha de fin',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  end_time?: string;
}
