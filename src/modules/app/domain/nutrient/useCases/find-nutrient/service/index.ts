import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Nutrient } from '@src/modules/database/entities';
import { FindNutrientRepository } from '../repository';

@Injectable()
export class FindNutrientService {
  constructor(private readonly findNutrient: FindNutrientRepository) {}

  private errorMessage(): string {
    return 'Nutrient is not found';
  }

  public async byId(id: string): FindResponse<Nutrient> {
    const nutrient = await this.findNutrient.byId(id);

    if (!nutrient) return left(new NotFoundException(this.errorMessage()));

    return right(nutrient);
  }

  public exec(): Promise<Nutrient[]> {
    return this.findNutrient.exec();
  }
}
