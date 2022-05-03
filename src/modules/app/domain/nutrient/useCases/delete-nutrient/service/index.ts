import { Injectable } from '@nestjs/common';
import { UpdateNutrientRepository } from '../../update-nutrient/repository';

@Injectable()
export class DeleteNutrientService {
  constructor(private readonly updateNutrient: UpdateNutrientRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateNutrient.inactive(id);
  }
}
