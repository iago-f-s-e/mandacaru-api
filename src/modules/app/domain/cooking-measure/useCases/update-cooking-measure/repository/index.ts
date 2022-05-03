import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCookingMeasureDTO } from '../dtos';

@Injectable()
export class UpdateCookingMeasureRepository {
  constructor(
    @InjectRepository(CookingMeasure) private readonly cookingMeasure: Repository<CookingMeasure>
  ) {}

  public inactive(id: string): Promise<UpdateResult> {
    return this.cookingMeasure.update({ id }, { isActive: false });
  }

  public reactive(id: string): Promise<UpdateResult> {
    return this.cookingMeasure.update({ id }, { isActive: true });
  }

  public exec(data: UpdateCookingMeasureDTO): Promise<UpdateResult> {
    return this.cookingMeasure.update({ id: data.id }, data);
  }
}
