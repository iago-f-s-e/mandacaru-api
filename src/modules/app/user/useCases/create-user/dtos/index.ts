import { CreateAddressDTO } from '@src/modules/app/address/useCases/create-address/dtos';
import { UserRoles } from '@src/modules/common/types/entities';

export type CreateUserDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRoles;
  document: string;
  address?: CreateAddressDTO[];
};
