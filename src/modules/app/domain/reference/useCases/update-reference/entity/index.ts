import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { ReferenceDTO } from '../../../dtos';
import { UpdateReferenceDTO } from '../dtos';
import { Assert, Errors, Set, Validated } from './types';
export class ValidateToUpdateReference {
  private readonly toUpdate: UpdateReferenceDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected abbreviationOrError!: ValidateResponse<ValidateString>;

  constructor(data: ReferenceDTO & { id: string }) {
    this.set(data);

    this.assert(this.idOrError, this.nameOrError, this.abbreviationOrError);

    const id = this.idOrError.value;
    const name = this.nameOrError.value;
    const abbreviation = this.abbreviationOrError.value;

    this.toUpdate = this.afterAssert({ name, abbreviation, id });
  }

  private set(data: ReferenceDTO & { id: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, { errorMessage: errorMessage.id });

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
      id: 'The reference id is invalid',
      name: `The name "${data.name}" is invalid`,
      abbreviation: `The abbreviation "${data.abbreviation}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateReferenceDTO {
    return {
      id: validated.id.value,
      abbreviation: validated.abbreviation.value,
      name: validated.name.value.toUpperCase()
    };
  }

  public get value(): Readonly<UpdateReferenceDTO> {
    return Object.freeze(this.toUpdate);
  }
}
