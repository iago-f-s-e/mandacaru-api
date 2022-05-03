import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { ReferenceDTO } from '../../../dtos';
import { CreateReferenceDTO } from '../dtos';
import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateReference {
  private readonly toCreate: CreateReferenceDTO;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected abbreviationOrError!: ValidateResponse<ValidateString>;

  constructor(data: ReferenceDTO) {
    this.set(data);

    this.assert(this.nameOrError, this.abbreviationOrError);

    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;

    this.toCreate = this.afterAssert({ name, abbreviation });
  }

  private set(data: ReferenceDTO): asserts this is this & Set {
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

  private afterAssert(validated: Validated): CreateReferenceDTO {
    return {
      abbreviation: validated.abbreviation.value,
      name: validated.name.value.toUpperCase()
    };
  }

  public get value(): Readonly<CreateReferenceDTO> {
    return Object.freeze(this.toCreate);
  }
}
