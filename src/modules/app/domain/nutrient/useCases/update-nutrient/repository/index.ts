import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateNutrientDTO } from '../dtos';

@Injectable()
export class UpdateNutrientRepository {
  constructor(@InjectRepository(Nutrient) private readonly nutrient: Repository<Nutrient>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.nutrient.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.nutrient.update({ id }, { isActive: false });
  }

  public exec(data: UpdateNutrientDTO): Promise<UpdateResult> {
    return this.nutrient.update({ id: data.id }, data);
  }
}
