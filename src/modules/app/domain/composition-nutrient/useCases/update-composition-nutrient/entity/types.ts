import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  compositionId: ValidateUUID;
  nutrientId: ValidateUUID;
  quantity: ValidateNumber;
};

export type Assert = {
  compositionIdOrError: Right<null, ValidateUUID>;
  nutrientIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  compositionIdOrError: ValidateResponse<ValidateUUID>;
  nutrientIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  compositionId: string;
  nutrientId: string;
  quantity: string;
};
