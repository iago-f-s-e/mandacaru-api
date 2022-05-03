import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';

export type Validated = {
  id: ValidateUUID;
  name: ValidateString;
  abbreviation: ValidateString;
  unitMeasure: ValidateString;
};

export type Assert = {
  idOrError: Right<null, ValidateUUID>;
  nameOrError: Right<null, ValidateString>;
  abbreviationOrError: Right<null, ValidateString>;
  unitMeasureOrError: Right<null, ValidateString>;
};

export type Set = {
  idOrError: ValidateResponse<ValidateUUID>;
  nameOrError: ValidateResponse<ValidateString>;
  abbreviationOrError: ValidateResponse<ValidateString>;
  unitMeasureOrError: ValidateResponse<ValidateString>;
};

export type Errors = {
  id: string;
  name: string;
  abbreviation: string;
  unitMeasure: string;
};
