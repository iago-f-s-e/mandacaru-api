import { UpdateCompositionNutrientDTO } from '@src/modules/app/domain/composition-nutrient/useCases/update-composition-nutrient/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  id: ValidateUUID;
  referenceId: ValidateUUID;
  quantity: ValidateNumber;
  nutrients: UpdateCompositionNutrientDTO[];
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  referenceIdOrError: Right<null, ValidateUUID>;
  quantityOrError: Right<null, ValidateNumber>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  referenceIdOrError: ValidateResponse<ValidateUUID>;
  quantityOrError: ValidateResponse<ValidateNumber>;
};

export type Errors = {
  id: string;
  referenceId: string;
  quantity: string;
};
