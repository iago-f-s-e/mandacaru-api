import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iLikeGenerator } from '@src/modules/common/utils';
import { Nutrient } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { ListNutrientDTO } from '../dtos';

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

  public exec(filter: ListNutrientDTO): Promise<Nutrient[]> {
    const ilike = iLikeGenerator(filter, 'nutrient');

    return this.nutrient
      .createQueryBuilder('nutrient')
      .where('nutrient.isActive = true')
      .andWhere(ilike.query, ilike.params)
      .orderBy('nutrient.name', 'ASC')
      .getMany();
  }
}
