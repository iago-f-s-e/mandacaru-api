import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aliment } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateAlimentDTO } from '../dtos';

@Injectable()
export class CreateAlimentRepository {
  constructor(@InjectRepository(Aliment) private readonly aliment: Repository<Aliment>) {}

  public exec(data: CreateAlimentDTO): Promise<Aliment> {
    return this.aliment.save(this.aliment.create(data));
  }
}
