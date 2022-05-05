import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateAlimentDTO } from '../dtos';

@Injectable()
export class UpdateAlimentRepository {
  constructor(@InjectRepository(Aliment) private readonly aliment: Repository<Aliment>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.aliment.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.aliment.update({ id }, { isActive: false });
  }

  public exec(data: Omit<UpdateAlimentDTO, 'composition'>): Promise<UpdateResult> {
    return this.aliment.update({ id: data.id }, data);
  }
}
