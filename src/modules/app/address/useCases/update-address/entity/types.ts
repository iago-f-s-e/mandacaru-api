import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ValidateZipCode } from '../../../validators';

export type Validated = {
  id: string;
  userId: ValidateUUID;
  state: ValidateString;
  city: ValidateString;
  district: ValidateString;
  street: ValidateString;
  zipCode: ValidateZipCode;
  number: ValidateNumber;
  complement: ValidateString;
};

export type Assert = {
  userIdOrError: Right<null, ValidateUUID>;
  stateOrError: Right<null, ValidateString>;
  cityOrError: Right<null, ValidateString>;
  districtOrError: Right<null, ValidateString>;
  streetOrError: Right<null, ValidateString>;
  zipCodeOrError: Right<null, ValidateZipCode>;
  numberOrError: Right<null, ValidateNumber>;
  complementOrError: Right<null, ValidateString>;
};

export type Set = {
  userIdOrError: ValidateResponse<ValidateUUID>;
  stateOrError: ValidateResponse<ValidateString>;
  cityOrError: ValidateResponse<ValidateString>;
  districtOrError: ValidateResponse<ValidateString>;
  streetOrError: ValidateResponse<ValidateString>;
  zipCodeOrError: ValidateResponse<ValidateZipCode>;
  numberOrError: ValidateResponse<ValidateNumber>;
  complementOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  userId: string;
  state: string;
  city: string;
  district: string;
  street: string;
  zipCode: string;
  number: string;
  complement: string;
};
