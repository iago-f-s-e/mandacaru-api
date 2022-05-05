import { Injectable } from '@nestjs/common';
import { UpdateAlimentRepository } from '../../update-aliment/repository';

@Injectable()
export class DeleteAlimentService {
  constructor(private readonly updateAliment: UpdateAlimentRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateAliment.inactive(id);
  }
}
