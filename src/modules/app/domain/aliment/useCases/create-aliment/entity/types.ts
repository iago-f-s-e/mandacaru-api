import { CreateCompositionDTO } from '@src/modules/app/domain/composition/useCases/create-composition/dtos';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';

export type Validated = {
  name: ValidateString;
  composition: CreateCompositionDTO;
};

export type Assert = {
  nameOrError: Right<null, ValidateString>;
};

export type Set = {
  nameOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  name: string;
};
