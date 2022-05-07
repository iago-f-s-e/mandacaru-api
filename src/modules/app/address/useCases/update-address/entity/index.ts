import { maxSize, minSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { ValidateNumber, ValidateString, ValidateUUID } from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { AddressDTO } from '../../../dtos';
import { ValidateZipCode } from '../../../validators';
import { UpdateAddressDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToUpdateAddress {
  private readonly toUpdate: UpdateAddressDTO;
  protected userIdOrError!: ValidateResponse<ValidateUUID>;
  protected stateOrError!: ValidateResponse<ValidateString>;
  protected cityOrError!: ValidateResponse<ValidateString>;
  protected districtOrError!: ValidateResponse<ValidateString>;
  protected streetOrError!: ValidateResponse<ValidateString>;
  protected zipCodeOrError!: ValidateResponse<ValidateZipCode>;
  protected numberOrError!: ValidateResponse<ValidateNumber>;
  protected complementOrError!: ValidateResponse<ValidateString>;

  constructor(data: AddressDTO & { userId: string }) {
    this.set(data);

    this.assert(
      this.userIdOrError,
      this.stateOrError,
      this.cityOrError,
      this.districtOrError,
      this.streetOrError,
      this.zipCodeOrError,
      this.numberOrError,
      this.complementOrError
    );

    const id = data.id;
    const userId = this.userIdOrError.value;
    const state = this.stateOrError.value;
    const city = this.cityOrError.value;
    const district = this.districtOrError.value;
    const street = this.streetOrError.value;
    const zipCode = this.zipCodeOrError.value;
    const number = this.numberOrError.value;
    const complement = this.complementOrError.value;

    this.toUpdate = this.afterValidate({
      id,
      userId,
      state,
      city,
      district,
      street,
      zipCode,
      number,
      complement
    });
  }

  private set(data: AddressDTO & { userId: string }): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.userIdOrError = ValidateUUID.exec(data.userId, { errorMessage: errorMessage.userId });

    this.stateOrError = ValidateString.exec(
      data.state,
      { isOptional: false, maxSize: maxSize.ADDRESS_STATE },
      { errorMessage: errorMessage.state }
    );

    this.cityOrError = ValidateString.exec(
      data.city,
      { isOptional: false, maxSize: maxSize.ADDRESS_CITY },
      { errorMessage: errorMessage.city }
    );

    this.districtOrError = ValidateString.exec(
      data.district,
      { isOptional: false, maxSize: maxSize.ADDRESS_DISTRICT },
      { errorMessage: errorMessage.district }
    );

    this.streetOrError = ValidateString.exec(
      data.street,
      { isOptional: false, maxSize: maxSize.ADDRESS_STREET },
      { errorMessage: errorMessage.street }
    );

    this.zipCodeOrError = ValidateZipCode.exec(
      data.zipCode,
      { maxSize: maxSize.ADDRESS_ZIP_CODE, minSize: minSize.ADDRESS_ZIP_CODE },
      { errorMessage: errorMessage.zipCode }
    );

    this.numberOrError = ValidateNumber.exec(
      data.number,
      { isOptional: true },
      { errorMessage: errorMessage.number }
    );

    this.complementOrError = ValidateString.exec(
      data.complement,
      { isOptional: true, maxSize: maxSize.ADDRESS_COMPLEMENT },
      { errorMessage: errorMessage.complement }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: AddressDTO & { userId: string }): Errors {
    return {
      userId: `The user id "${data.userId}" is invalid`,
      state: `The state "${data.state}" is invalid`,
      city: `The city "${data.city}" is invalid`,
      district: `The district "${data.district}" is invalid`,
      street: `The street "${data.street}" is invalid`,
      zipCode: `The zipCode "${data.zipCode}" is invalid`,
      number: `The number "${data.number}" is invalid`,
      complement: `The complement "${data.complement}" is invalid`
    };
  }

  private afterValidate(validated: Validated): UpdateAddressDTO {
    return {
      id: validated.id,
      userId: validated.userId.value,
      state: validated.state.value.toUpperCase(),
      city: validated.city.value.toUpperCase(),
      district: validated.district.value.toUpperCase(),
      street: validated.street.value.toUpperCase(),
      zipCode: validated.zipCode.value,
      number: validated.number.value,
      complement: validated.complement.value
    };
  }

  public get value(): Readonly<UpdateAddressDTO> {
    return Object.freeze(this.toUpdate);
  }
}
