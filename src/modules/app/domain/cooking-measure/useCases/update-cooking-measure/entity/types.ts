import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  id: ValidateUUID;
  name: ValidateString;
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  nameOrError: Right<null, ValidateString>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  nameOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  id: string;
  name: string;
};
