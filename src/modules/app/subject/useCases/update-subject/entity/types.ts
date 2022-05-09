import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import {
  ValidateEmail,
  ValidateNumber,
  ValidateString,
  ValidateUUID
} from '@src/modules/common/validators';
import { ValidateBirthdate, ValidateGender } from '../../../validators';

export type Validated = {
  id: ValidateUUID;
  userId: ValidateUUID;
  name: ValidateString;
  surname: ValidateString;
  email: ValidateEmail;
  birthdate: ValidateBirthdate;
  gender: ValidateGender;
  weight: ValidateNumber;
  height: ValidateNumber;
  circumference: ValidateNumber;
  address?: UpdateAddressDTO;
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  userIdOrError: Right<null, ValidateUUID>;
  nameOrError: Right<null, ValidateString>;
  surnameOrError: Right<null, ValidateString>;
  emailOrError: Right<null, ValidateEmail>;
  birthdateOrError: Right<null, ValidateBirthdate>;
  genderOrError: Right<null, ValidateGender>;
  weightOrError: Right<null, ValidateNumber>;
  heightOrError: Right<null, ValidateNumber>;
  circumferenceOrError: Right<null, ValidateNumber>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  userIdOrError: ValidateResponse<ValidateUUID>;
  nameOrError: ValidateResponse<ValidateString>;
  surnameOrError: ValidateResponse<ValidateString>;
  emailOrError: ValidateResponse<ValidateEmail>;
  birthdateOrError: ValidateResponse<ValidateBirthdate>;
  genderOrError: ValidateResponse<ValidateGender>;
  weightOrError: ValidateResponse<ValidateNumber>;
  heightOrError: ValidateResponse<ValidateNumber>;
  circumferenceOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  id: string;
  userId: string;
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  gender: string;
  weight: string;
  height: string;
  circumference: string;
};
