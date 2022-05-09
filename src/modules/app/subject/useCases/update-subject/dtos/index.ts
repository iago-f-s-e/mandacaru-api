import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { Genders } from '@src/modules/common/types/entities';

export type UpdateSubjectDTO = {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  gender: Genders;
  weight: number;
  height: number;
  circumference: number;
  address?: UpdateAddressDTO;
};
