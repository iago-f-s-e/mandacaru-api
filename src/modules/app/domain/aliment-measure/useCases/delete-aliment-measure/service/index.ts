import { Injectable } from '@nestjs/common';
import { UpdateAlimentMeasureRepository } from '../../update-aliment-measure/repository';

@Injectable()
export class DeleteAlimentMeasureService {
  constructor(private readonly updateAlimentMeasure: UpdateAlimentMeasureRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateAlimentMeasure.inactive(id);
  }
}
