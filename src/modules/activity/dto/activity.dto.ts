import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
  @ApiProperty({
    description: 'ID único de la actividad',
    example: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
  })
  id: string;

  @ApiProperty({
    description: 'Título de la actividad',
    example: 'La Colonia en Perú (1532-1821)',
  })
  title: string;

  @ApiProperty({
    description: 'Descripción de la actividad',
    example: 'Sesión sobre el período colonial en Perú',
  })
  description: string;

  @ApiProperty({
    description: 'Si tiene introducción conversacional habilitada',
    example: true,
  })
  hasIntroduction: boolean;

  @ApiProperty({
    description: 'ID del enrollment asociado',
    example: 'b23c5d9f-56c3-5c1e-9d93-9c8c3b7a0f43',
  })
  enrollment_id: string;

  @ApiProperty({
    description: 'Fecha de creación',
    example: '2025-10-27T10:30:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha y hora de inicio',
    example: '2025-10-28T09:00:00Z',
    nullable: true,
  })
  start_time: Date | null;

  @ApiProperty({
    description: 'Fecha y hora de fin',
    example: '2025-10-28T11:00:00Z',
  })
  end_time: Date;
}
