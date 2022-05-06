import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateDocument, ValidateEmail, ValidateString } from '@src/modules/common/validators';
import { ValidateUserRole } from '../../../validators';

export type Validated = {
  name: ValidateString;
  surname: ValidateString;
  email: ValidateEmail;
  password: ValidateString;
  role: ValidateUserRole;
  document: ValidateDocument;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  surnameOrError: Right<null, ValidateString>;
  emailOrError: Right<null, ValidateEmail>;
  passwordOrError: Right<null, ValidateString>;
  roleOrError: Right<null, ValidateUserRole>;
  documentOrError: Right<null, ValidateDocument>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  surnameOrError: ValidateResponse<ValidateString>;
  emailOrError: ValidateResponse<ValidateEmail>;
  passwordOrError: ValidateResponse<ValidateString>;
  roleOrError: ValidateResponse<ValidateUserRole>;
  documentOrError: ValidateResponse<ValidateDocument>;
};

export type Errors = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
  document: string;
};
