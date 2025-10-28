import { Role } from '@prisma/client';

export class UserDto {
  id: string;
  full_name: string;
  email: string;
  role: Role;
  createdAt: Date;
}
