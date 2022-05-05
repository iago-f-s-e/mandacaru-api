import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  measureId: ValidateUUID;
  quantity: ValidateNumber;
};

export type Assert = {
  measureIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  measureIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  measureId: string;
  quantity: string;
};
