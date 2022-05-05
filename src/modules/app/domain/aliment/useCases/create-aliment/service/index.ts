import { ConflictException, Injectable } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { CreateResponse } from '@src/modules/common/types/responses';
import { Aliment } from '@src/modules/database/entities';
import { FindAlimentRepository } from '../../find-aliment/repository';
import { UpdateAlimentRepository } from '../../update-aliment/repository';
import { CreateAlimentDTO } from '../dtos';
import { CreateAlimentRepository } from '../repository';

@Injectable()
export class CreateAlimentService {
  constructor(
    private readonly createAliment: CreateAlimentRepository,
    private readonly findAliment: FindAlimentRepository,
    private readonly updateAliment: UpdateAlimentRepository
  ) {}

  private insert(data: CreateAlimentDTO): Promise<Aliment> {
    return this.createAliment.exec(data);
  }

  private errorMessage(data: CreateAlimentDTO): string {
    return `The name "${data.name}" already exists`;
  }

  public async exec(data: CreateAlimentDTO): CreateResponse<Aliment> {
    const existing = await this.findAliment.existing(data.name);

    if (!existing) return right(await this.insert(data));

    if (existing.isActive) return left(new ConflictException(this.errorMessage(data)));

    await this.updateAliment.reactive(existing.id);

    return right(existing);
  }
}
