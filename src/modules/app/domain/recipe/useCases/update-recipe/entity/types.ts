import { UpdateRecipeCompositionDTO } from '@src/modules/app/domain/recipe-composition/useCases/update-recipe-composition/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  id: ValidateUUID;
  name: ValidateString;
  gram: ValidateNumber;
  referenceId: ValidateUUID;
  preparationMethod: ValidateString;
  compositions: UpdateRecipeCompositionDTO[];
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  nameOrError: Right<null, ValidateString>;
  gramOrError: Right<null, ValidateNumber>;
  referenceIdOrError: Right<null, ValidateUUID>;
  preparationMethodOrError: Right<null, ValidateString>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  nameOrError: ValidateResponse<ValidateString>;
  gramOrError: ValidateResponse<ValidateNumber>;
  referenceIdOrError: ValidateResponse<ValidateUUID>;
  preparationMethodOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  id: string;
  name: string;
  gram: string;
  referenceId: string;
  preparationMethod: string;
};
