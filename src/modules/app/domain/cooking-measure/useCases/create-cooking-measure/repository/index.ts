import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateCookingMeasureDTO } from '../dtos';

@Injectable()
export class CreateCookingMeasureRepository {
  constructor(
    @InjectRepository(CookingMeasure) private readonly cookingMeasure: Repository<CookingMeasure>
  ) {}

  public exec(data: CreateCookingMeasureDTO): Promise<CookingMeasure> {
    return this.cookingMeasure.save(this.cookingMeasure.create(data));
  }
}
