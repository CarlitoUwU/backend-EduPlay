import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Información del usuario autenticado',
    example: {
      id: 'a12f4c9e-45b2-4b0d-8a92-8b7b2a6f9e32',
      full_name: 'María García',
      email: 'maria.garcia@eduplay.com',
      role: 'TEACHER',
    },
  })
  user: {
    id: string;
    full_name: string;
    email: string;
    role: string;
  };

  @ApiProperty({
    description: 'Token JWT para autenticación',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
