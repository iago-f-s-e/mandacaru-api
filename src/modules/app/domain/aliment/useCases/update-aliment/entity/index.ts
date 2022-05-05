import { ValidateToUpdateComposition } from '@src/modules/app/domain/composition/useCases/update-composition/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { AlimentDTO } from '../../../dtos';
import { UpdateAlimentDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateAliment {
  private readonly toUpdate: UpdateAlimentDTO;
  protected idOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;

  constructor(data: AlimentDTO) {
    this.set(data);

    this.assert(this.idOrError, this.nameOrError);

    const id = this.idOrError.value;
    const name = this.nameOrError.value;

    const composition = new ValidateToUpdateComposition(data.composition).value;

    this.toUpdate = this.afterAssert({ id, name, composition });
  }

  private set(data: AlimentDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.idOrError = ValidateUUID.exec(data.id, {
      errorMessage: errorMessage.id
    });

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.ALIMENT_NAME },
      { errorMessage: errorMessage.name }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: AlimentDTO): Errors {
    return {
      id: `The aliment id "${data.id}" is not a invalid`,
      name: `The name "${data.name}" is invalid`
    };
  }

  private afterAssert(validated: Validated): UpdateAlimentDTO {
    return {
      id: validated.id.value,
      name: validated.name.value.toUpperCase(),
      composition: validated.composition
    };
  }

  public get value(): Readonly<UpdateAlimentDTO> {
    return Object.freeze(this.toUpdate);
  }
}
