import { CreateRecipeCompositionDTO } from '@src/modules/app/domain/recipe-composition/useCases/create-recipe-composition/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  name: ValidateString;
  gram: ValidateNumber;
  referenceId: ValidateUUID;
  preparationMethod: ValidateString;
  compositions: CreateRecipeCompositionDTO[];
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
  gramOrError: Right<null, ValidateNumber>;
  referenceIdOrError: Right<null, ValidateUUID>;
  preparationMethodOrError: Right<null, ValidateString>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
  gramOrError: ValidateResponse<ValidateNumber>;
  referenceIdOrError: ValidateResponse<ValidateUUID>;
  preparationMethodOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  name: string;
  gram: string;
  referenceId: string;
  preparationMethod: string;
};
