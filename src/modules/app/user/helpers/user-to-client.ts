import { User } from '@src/modules/database/entities';
import { UserToClientDTO } from '../dtos';

export function userToClient(data: User): UserToClientDTO {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
    surname: data.surname
  };
}
