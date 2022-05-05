import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlimentMeasure } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateAlimentMeasureDTO } from '../dtos';

@Injectable()
export class CreateAlimentMeasureRepository {
  constructor(
    @InjectRepository(AlimentMeasure) private readonly aliment: Repository<AlimentMeasure>
  ) {}

  public exec(data: CreateAlimentMeasureDTO): Promise<AlimentMeasure> {
    return this.aliment.save(this.aliment.create(data));
  }
}
