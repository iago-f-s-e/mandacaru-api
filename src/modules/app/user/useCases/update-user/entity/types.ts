import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ValidateUserRole } from '../../../validators';

export type Validated = {
  id: ValidateUUID;
  name: ValidateString;
  surname: ValidateString;
  role: ValidateUserRole;
  address?: UpdateAddressDTO;
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  nameOrError: Right<null, ValidateString>;
  surnameOrError: Right<null, ValidateString>;
  roleOrError: Right<null, ValidateUserRole>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  nameOrError: ValidateResponse<ValidateString>;
  surnameOrError: ValidateResponse<ValidateString>;
  roleOrError: ValidateResponse<ValidateUserRole>;
};

export type Errors = {
  id: string;
  name: string;
  surname: string;
  role: string;
};
