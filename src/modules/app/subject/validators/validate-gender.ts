import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { genders, Genders } from '@src/modules/common/types/entities';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { OnError } from '@src/modules/common/validators/types';

export class ValidateGender {
  private readonly data: Genders;

  private constructor(data: Genders) {
    this.data = data;
    Object.freeze(this);
  }
  public static exec(data: Genders, onError: OnError): ValidateResponse<ValidateGender> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateGender(data));
  }

  private static isValid(data: Genders): boolean {
    return !!genders[data];
  }

  public get value(): Genders {
    return this.data;
  }
}
