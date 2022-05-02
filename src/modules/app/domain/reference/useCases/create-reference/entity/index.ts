import { maxSize } from '@src/modules/common/constants';
import { Right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ReferenceDTO } from '../../../dtos';
import { CreateReferenceDTO } from '../dtos';

type Validated = {
  name: ValidateString;
  abbreviation: ValidateString;
};

type Assert = {
  nameOrError: Right<null, ValidateString>;
  abbreviationOrError: Right<null, ValidateString>;
};

type Errors = {
  name: string;
  abbreviation: string;
};

type ToBeAssert = Array<ValidateResponse<unknown>>;

export class ValidateToCreateReference {
  private readonly toCreate: CreateReferenceDTO;
  public readonly nameOrError: ValidateResponse<ValidateString>;
  public readonly abbreviationOrError: ValidateResponse<ValidateString>;

  constructor(data: ReferenceDTO) {
    const errorMessage = this.getErrorMessage(data);

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.REFERENCE_NAME },
      { errorMessage: errorMessage.name }
    );

    this.abbreviationOrError = ValidateString.exec(
      data.abbreviation,
      { isOptional: false, maxSize: maxSize.ABBREVIATION },
      { errorMessage: errorMessage.abbreviation }
    );

    this.assert(this.nameOrError, this.abbreviationOrError);

    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;

    this.toCreate = this.afterValidate({ name, abbreviation });
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: ReferenceDTO): Errors {
    return {
      name: `The name "${data.name}" is invalid`,
      abbreviation: `The abbreviation "${data.abbreviation}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateReferenceDTO {
    return {
      abbreviation: validated.abbreviation.value,
      name: validated.name.value.toUpperCase()
    };
  }

  public get value(): Readonly<CreateReferenceDTO> {
    return Object.freeze(this.toCreate);
  }
}
