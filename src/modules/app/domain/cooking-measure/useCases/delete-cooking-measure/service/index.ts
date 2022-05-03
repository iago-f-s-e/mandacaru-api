import { Injectable } from '@nestjs/common';
import { UpdateCookingMeasureRepository } from '../../update-cooking-measure/repository';

@Injectable()
export class DeleteCookingMeasureService {
  constructor(private readonly updateCookingMeasure: UpdateCookingMeasureRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateCookingMeasure.inactive(id);
  }
}
