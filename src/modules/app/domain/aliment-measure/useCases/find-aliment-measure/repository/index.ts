import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindAlimentMeasureRepository {
  constructor(
    @InjectRepository(AlimentMeasure) private readonly aliment: Repository<AlimentMeasure>
  ) {}

  public existing(
    alimentId: string,
    measureId: string,
    referenceId: string
  ): Promise<AlimentMeasure | null> {
    return this.aliment
      .createQueryBuilder('alimentMeasure')
      .addSelect('alimentMeasure.isActive')
      .innerJoinAndSelect('alimentMeasure.measure', 'measure')
      .where('alimentMeasure.alimentId = :alimentId', { alimentId })
      .andWhere('alimentMeasure.measureId = :measureId', { measureId })
      .andWhere('alimentMeasure.referenceId = :referenceId', { referenceId })
      .getOne();
  }

  public active(id: string): Promise<AlimentMeasure | null> {
    return this.aliment.findOne({
      where: { id, isActive: true },
      select: {
        id: true,
        isActive: true
      }
    });
  }
}
