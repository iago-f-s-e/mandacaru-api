import { CreateAddressDTO } from '@src/modules/app/address/useCases/create-address/dtos';
import { Genders } from '@src/modules/common/types/entities';

export type CreateSubjectDTO = {
  userId: string;
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  gender: Genders;
  weight: number;
  height: number;
  circumference: number;
  address?: CreateAddressDTO[];
};
