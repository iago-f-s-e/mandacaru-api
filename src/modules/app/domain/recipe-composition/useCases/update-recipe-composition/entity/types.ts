import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  recipeId: ValidateUUID;
  measureId: ValidateUUID;
  quantity: ValidateNumber;
};

export type Assert = {
  recipeIdOrError: Right<null, ValidateUUID>;
  measureIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  recipeIdOrError: ValidateResponse<ValidateUUID>;
  measureIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  recipeId: string;
  measureId: string;
  quantity: string;
};
