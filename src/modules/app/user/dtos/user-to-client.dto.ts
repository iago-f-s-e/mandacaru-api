import { UserRoles } from '@src/modules/common/types/entities';
import { AddressDTO } from '../../address/dtos';

export type UserToClientDTO = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRoles;
  address?: AddressDTO;
};
