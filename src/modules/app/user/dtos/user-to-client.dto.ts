import { UserRoles } from '@src/modules/common/types/entities';
import { AddressToClient } from '../../address/dtos';

export type UserToClientDTO = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRoles;
  address?: AddressToClient;
};
