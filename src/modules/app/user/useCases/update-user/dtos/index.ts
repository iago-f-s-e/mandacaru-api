import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { UserRoles } from '@src/modules/common/types/entities';

export type UpdateUserDTO = {
  id: string;
  name: string;
  surname: string;
  role: UserRoles;
  address?: UpdateAddressDTO;
};
