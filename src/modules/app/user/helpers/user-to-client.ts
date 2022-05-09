import { User } from '@src/modules/database/entities';
import { addressToClient } from '../../address/helpers';
import { UserToClientDTO } from '../dtos';

export function userToClient(data: User): UserToClientDTO {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    role: data.role,
    surname: data.surname,
    address: data.address?.length ? addressToClient(data.address[0]) : undefined
  };
}
