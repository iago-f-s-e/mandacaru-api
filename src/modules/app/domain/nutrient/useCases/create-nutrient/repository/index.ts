import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateNutrientDTO } from '../dtos';

@Injectable()
export class CreateNutrientRepository {
  constructor(@InjectRepository(Nutrient) private readonly nutrient: Repository<Nutrient>) {}

  public exec(data: CreateNutrientDTO): Promise<Nutrient> {
    return this.nutrient.save(this.nutrient.create(data));
  }
}
