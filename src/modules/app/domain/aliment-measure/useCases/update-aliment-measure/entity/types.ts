import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  id: ValidateUUID;
  quantity: ValidateNumber;
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  id: string;
  quantity: string;
};
