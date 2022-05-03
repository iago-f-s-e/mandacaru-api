import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CookingMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

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

  public exec(): Promise<CookingMeasure[]> {
    return this.cookingMeasure.findBy({ isActive: true });
  }
}
