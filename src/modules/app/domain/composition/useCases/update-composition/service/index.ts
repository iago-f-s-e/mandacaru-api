import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompositionNutrientDTO } from '@src/modules/app/domain/composition-nutrient/useCases/update-composition-nutrient/dtos';
import { UpdateCompositionNutrientService } from '@src/modules/app/domain/composition-nutrient/useCases/update-composition-nutrient/service';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { Composition } from '@src/modules/database/entities';
import { FindCompositionRepository } from '../../find-composition/repository';
import { UpdateCompositionDTO } from '../dtos';
import { UpdateCompositionRepository } from '../repository';

@Injectable()
export class UpdateCompositionService {
  constructor(
    private readonly findComposition: FindCompositionRepository,
    private readonly updateComposition: UpdateCompositionRepository,
    private readonly updateCompositionNutrient: UpdateCompositionNutrientService
  ) {}

  private async updateNutrients(
    data: UpdateCompositionNutrientDTO[],
    originalComposition: Composition
  ): Promise<void> {
    return this.updateCompositionNutrient.exec(data, originalComposition);
  }

  private errorMessage(): string {
    return 'Composition is not found';
  }

  public async exec(data: UpdateCompositionDTO): UpdateResponse<null> {
    const originalComposition = await this.findComposition.byId(data.id);

    if (!originalComposition) return left(new NotFoundException(this.errorMessage()));

    const { nutrients, ...composition } = data;

    await this.updateNutrients(nutrients, originalComposition);
    await this.updateComposition.exec(composition);

    return right(null);
  }
}
