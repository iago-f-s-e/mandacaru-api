import { BadRequestException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { ValidateResponse } from '@src/modules/common/types/responses';
import { OnError } from '@src/modules/common/validators/types';
import { isValidBirthdate } from './helpers';

export class ValidateBirthdate {
  private readonly data: string;

  private constructor(data: string) {
    this.data = data;
    Object.freeze(this);
  }
  public static exec(data: string, onError: OnError): ValidateResponse<ValidateBirthdate> {
    if (!this.isValid(data)) return left(new BadRequestException(onError.errorMessage));

    return right(new ValidateBirthdate(this.parseToUSDate(data)));
  }

  private static isValid(data: string): boolean {
    return isValidBirthdate(data);
  }

  private static parseToUSDate(data: string): string {
    return new Intl.DateTimeFormat('en-US').format(new Date(data));
  }

  public get value(): string {
    return this.data;
  }
}
