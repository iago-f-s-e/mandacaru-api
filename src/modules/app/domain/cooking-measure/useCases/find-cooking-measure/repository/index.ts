import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { iLikeGenerator } from '@src/modules/common/utils';
import { CookingMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { ListCookingMeasure } from '../dtos';

@Injectable()
export class FindCookingMeasureRepository {
  constructor(
    @InjectRepository(CookingMeasure) private readonly cookingMeasure: Repository<CookingMeasure>
  ) {}

  public existing(name: string): Promise<CookingMeasure | null> {
    return this.cookingMeasure.findOne({
      where: { name },
      select: { id: true, isActive: true }
    });
  }

  public byId(id: string): Promise<CookingMeasure | null> {
    return this.cookingMeasure.findOneBy({ id, isActive: true });
  }

  public exec(filter: ListCookingMeasure): Promise<CookingMeasure[]> {
    const ilike = iLikeGenerator(filter, 'cookingMeasure');

    return this.cookingMeasure
      .createQueryBuilder('cookingMeasure')
      .where('cookingMeasure.isActive = true')
      .andWhere(ilike.query, ilike.params)
      .orderBy('cookingMeasure.name', 'ASC')
      .getMany();
  }
}
