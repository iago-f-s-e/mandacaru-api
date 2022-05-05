import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Composition } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateCompositionDTO } from '../dtos';

@Injectable()
export class UpdateCompositionRepository {
  constructor(@InjectRepository(Composition) private readonly aliment: Repository<Composition>) {}

  public exec(data: Omit<UpdateCompositionDTO, 'nutrients'>): Promise<UpdateResult> {
    return this.aliment.update({ id: data.id }, data);
  }
}
