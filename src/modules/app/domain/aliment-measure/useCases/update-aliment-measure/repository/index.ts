import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateAlimentMeasureDTO } from '../dtos';

@Injectable()
export class UpdateAlimentMeasureRepository {
  constructor(
    @InjectRepository(AlimentMeasure) private readonly aliment: Repository<AlimentMeasure>
  ) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.aliment.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.aliment.update({ id }, { isActive: false });
  }

  public exec(data: UpdateAlimentMeasureDTO): Promise<UpdateResult> {
    return this.aliment.update({ id: data.id }, data);
  }
}
