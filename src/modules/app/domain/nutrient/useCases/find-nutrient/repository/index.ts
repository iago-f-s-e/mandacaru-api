import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nutrient } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindNutrientRepository {
  constructor(@InjectRepository(Nutrient) private readonly nutrient: Repository<Nutrient>) {}

  public existing(name: string): Promise<Nutrient | null> {
    return this.nutrient.findOne({
      where: { name },
      select: { isActive: true, id: true }
    });
  }

  public byId(id: string): Promise<Nutrient | null> {
    return this.nutrient.findOneBy({ id, isActive: true });
  }

  public exec(): Promise<Nutrient[]> {
    return this.nutrient.findBy({ isActive: true });
  }
}
