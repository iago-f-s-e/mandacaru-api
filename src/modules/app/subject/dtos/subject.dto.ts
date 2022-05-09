import { Genders } from '@src/modules/common/types/entities';
import { AddressDTO } from '../../address/dtos';

export type SubjectDTO = {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  gender: Genders;
  weight: string;
  height: string;
  circumference: string;
  address?: AddressDTO;
};
