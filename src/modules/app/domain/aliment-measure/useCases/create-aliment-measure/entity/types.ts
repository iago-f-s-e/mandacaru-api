import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  alimentId: ValidateUUID;
  measureId: ValidateUUID;
  referenceId: ValidateUUID;
  quantity: ValidateNumber;
};

export type Assert = {
  alimentIdOrError: Right<null, ValidateUUID>;
  measureIdOrError: Right<null, ValidateUUID>;
  referenceIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  alimentIdOrError: ValidateResponse<ValidateUUID>;
  measureIdOrError: ValidateResponse<ValidateUUID>;
  referenceIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  alimentId: string;
  measureId: string;
  referenceId: string;
  quantity: string;
};
