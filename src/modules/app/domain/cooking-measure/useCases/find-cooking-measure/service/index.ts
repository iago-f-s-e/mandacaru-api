import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { CookingMeasure } from '@src/modules/database/entities';
import { ListCookingMeasure } from '../dtos';
import { FindCookingMeasureRepository } from '../repository';

@Injectable()
export class FindCookingMeasureService {
  constructor(private readonly findCookingMeasure: FindCookingMeasureRepository) {}

  private errorMessage(): string {
    return 'CookingMeasure is not found';
  }

  public async byId(id: string): FindResponse<CookingMeasure> {
    const cookingMeasure = await this.findCookingMeasure.byId(id);

    if (!cookingMeasure) return left(new NotFoundException(this.errorMessage()));

    return right(cookingMeasure);
  }

  public exec(filter: ListCookingMeasure): Promise<CookingMeasure[]> {
    return this.findCookingMeasure.exec(filter);
  }
}
