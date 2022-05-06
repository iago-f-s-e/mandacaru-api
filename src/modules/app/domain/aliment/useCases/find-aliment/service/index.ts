import { Injectable, NotFoundException } from '@nestjs/common';
import { left, right } from '@src/modules/common/either';
import { FindResponse } from '@src/modules/common/types/responses';
import { Aliment } from '@src/modules/database/entities';
import { ListAliment } from '../dtos';
import { FindAlimentRepository } from '../repository';

@Injectable()
export class FindAlimentService {
  constructor(private readonly findAliment: FindAlimentRepository) {}

  private errorMessage(): string {
    return 'Aliment is not found';
  }

  public async byId(id: string): FindResponse<Aliment> {
    const aliment = await this.findAliment.byId(id);

    if (!aliment) return left(new NotFoundException(this.errorMessage()));

    return right(aliment);
  }

  public exec(filter: ListAliment): Promise<Aliment[]> {
    return this.findAliment.exec(filter);
  }
}
