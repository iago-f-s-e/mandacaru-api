import { Genders } from '@src/modules/common/types/entities';
import { AddressToClient } from '../../address/dtos';

export type SubjectToClientDTO = {
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
  address?: AddressToClient;
};
