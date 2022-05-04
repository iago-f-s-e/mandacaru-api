import { CreateCompositionNutrientDTO } from '@src/modules/app/domain/composition-nutrient/useCases/create-composition-nutrient/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  referenceId: ValidateUUID;
  quantity: ValidateNumber;
  nutrients: CreateCompositionNutrientDTO[];
};

export type Assert = {
  referenceIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  referenceIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  referenceId: string;
  quantity: string;
};
