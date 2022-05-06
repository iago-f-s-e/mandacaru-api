import { UserRoles } from '@src/modules/common/types/entities';
import { AddressDTO } from '../../address/dtos';

export type UserDTO = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRoles;
  cpf: string;
  address?: AddressDTO;
};
