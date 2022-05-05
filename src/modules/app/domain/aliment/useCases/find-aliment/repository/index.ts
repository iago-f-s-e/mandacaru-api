import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindAlimentRepository {
  constructor(@InjectRepository(Aliment) private readonly aliment: Repository<Aliment>) {}

  public existing(name: string): Promise<Aliment | null> {
    return this.aliment.findOne({
      where: { name },
      select: {
        id: true,
        isActive: true
      }
    });
  }

  public active(id: string): Promise<Aliment | null> {
    return this.aliment.findOne({
      where: { id, isActive: true },
      select: {
        id: true,
        isActive: true
      }
    });
  }

  public byId(id: string): Promise<Aliment | null> {
    return this.aliment
      .createQueryBuilder('aliment')
      .select([
        'aliment.id',
        'aliment.name',
        'composition.id',
        'composition.quantity',
        'reference.id',
        'reference.name',
        'reference.abbreviation',
        'nutrients.quantity',
        'nutrient.id',
        'nutrient.abbreviation',
        'nutrient.name',
        'nutrient.unitMeasure'
      ])
      .innerJoin('aliment.composition', 'composition')
      .innerJoin('composition.reference', 'reference', 'reference.isActive = true')
      .leftJoin('composition.nutrients', 'nutrients')
      .leftJoin('nutrients.nutrient', 'nutrient', 'nutrient.isActive = true')
      .where('aliment.id = :id', { id })
      .andWhere('aliment.isActive = true')
      .getOne();
  }

  public exec(): Promise<Aliment[]> {
    return this.aliment
      .createQueryBuilder('aliment')
      .select([
        'aliment.id',
        'aliment.name',
        'composition.id',
        'composition.quantity',
        'reference.id',
        'reference.name'
      ])
      .innerJoin('aliment.composition', 'composition')
      .innerJoin('composition.reference', 'reference', 'reference.isActive = true')
      .where('aliment.isActive = true')
      .orderBy('aliment.name', 'ASC')
      .getMany();
  }
}
