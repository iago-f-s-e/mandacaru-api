import { ValidateToCreateAddress } from '@src/modules/app/address/useCases/create-address/entity';
import { maxSize } from '@src/modules/common/constants';
import { ValidateResponse } from '@src/modules/common/types/responses';
import {
  ValidateEmail,
  ValidateNumber,
  ValidateString,
  ValidateUUID
} from '@src/modules/common/validators';
import { ToBeAssert } from '@src/modules/common/validators/types';
import { SubjectDTO } from '../../../dtos';
import { ValidateBirthdate, ValidateGender } from '../../../validators';
import { CreateSubjectDTO } from '../dtos';

import { Assert, Errors, Set, Validated } from './types';

export class ValidateToCreateSubject {
  private readonly toCreate: CreateSubjectDTO;
  protected userIdOrError!: ValidateResponse<ValidateUUID>;
  protected nameOrError!: ValidateResponse<ValidateString>;
  protected surnameOrError!: ValidateResponse<ValidateString>;
  protected emailOrError!: ValidateResponse<ValidateEmail>;
  protected birthdateOrError!: ValidateResponse<ValidateBirthdate>;
  protected genderOrError!: ValidateResponse<ValidateGender>;
  protected weightOrError!: ValidateResponse<ValidateNumber>;
  protected heightOrError!: ValidateResponse<ValidateNumber>;
  protected circumferenceOrError!: ValidateResponse<ValidateNumber>;

  constructor(data: SubjectDTO) {
    this.set(data);

    this.assert(
      this.userIdOrError,
      this.nameOrError,
      this.surnameOrError,
      this.emailOrError,
      this.birthdateOrError,
      this.genderOrError,
      this.weightOrError,
      this.heightOrError,
      this.circumferenceOrError
    );

    const userId = this.userIdOrError.value;
    const name = this.nameOrError.value;
    const surname = this.surnameOrError.value;
    const email = this.emailOrError.value;
    const birthdate = this.birthdateOrError.value;
    const gender = this.genderOrError.value;
    const weight = this.weightOrError.value;
    const height = this.heightOrError.value;
    const circumference = this.circumferenceOrError.value;
    const address = data.address ? [new ValidateToCreateAddress(data.address).value] : undefined;

    this.toCreate = this.afterValidate({
      userId,
      name,
      surname,
      email,
      birthdate,
      gender,
      weight,
      height,
      circumference,
      address
    });
  }

  private set(data: SubjectDTO): asserts this is this & Set {
    const errorMessage = this.getErrorMessage(data);

    this.userIdOrError = ValidateUUID.exec(data.userId, { errorMessage: errorMessage.userId });

    this.nameOrError = ValidateString.exec(
      data.name,
      { isOptional: false, maxSize: maxSize.NAME },
      { errorMessage: errorMessage.name }
    );

    this.surnameOrError = ValidateString.exec(
      data.surname,
      { isOptional: false, maxSize: maxSize.SURNAME },
      { errorMessage: errorMessage.surname }
    );

    this.emailOrError = ValidateEmail.exec(
      data.email,
      { maxSize: maxSize.EMAIL },
      { errorMessage: errorMessage.email }
    );

    this.birthdateOrError = ValidateBirthdate.exec(data.birthdate, {
      errorMessage: errorMessage.birthdate
    });

    this.genderOrError = ValidateGender.exec(data.gender, { errorMessage: errorMessage.gender });

    this.weightOrError = ValidateNumber.exec(
      data.weight,
      { isOptional: false },
      { errorMessage: errorMessage.weight }
    );

    this.heightOrError = ValidateNumber.exec(
      data.height,
      { isOptional: false },
      { errorMessage: errorMessage.height }
    );

    this.circumferenceOrError = ValidateNumber.exec(
      data.circumference,
      { isOptional: false },
      { errorMessage: errorMessage.circumference }
    );
  }

  private assert(...toBeAssert: ToBeAssert): asserts this is this & Assert {
    for (const errorInstance of toBeAssert) {
      if (errorInstance.isLeft()) throw errorInstance.value;
    }
  }

  private getErrorMessage(data: SubjectDTO): Errors {
    return {
      userId: `The user id "${data.userId}" is invalid`,
      name: `The name "${data.name}" is invalid`,
      surname: `The surname "${data.surname}" is invalid`,
      email: `The email "${data.email}" is invalid`,
      birthdate: `The birthdate "${data.birthdate}" is invalid`,
      gender: `The gender "${data.gender}" is invalid`,
      weight: `The weight "${data.weight}" is invalid`,
      height: `The height "${data.height}" is invalid`,
      circumference: `The circumference "${data.circumference}" is invalid`
    };
  }

  private afterValidate(validated: Validated): CreateSubjectDTO {
    return {
      userId: validated.userId.value,
      name: validated.name.value.toUpperCase(),
      surname: validated.surname.value.toUpperCase(),
      email: validated.email.value.toLowerCase(),
      birthdate: validated.birthdate.value,
      gender: validated.gender.value,
      weight: validated.weight.value,
      height: validated.height.value,
      circumference: validated.circumference.value,
      address: validated.address
    };
  }

  public get value(): Readonly<CreateSubjectDTO> {
    return Object.freeze(this.toCreate);
  }
}
