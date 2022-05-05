import { Injectable } from '@nestjs/common';
import { Composition, CompositionNutrient } from '@src/modules/database/entities';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCompositionNutrientRepository } from '../../create-composition-nutrient/repository';
import { DeleteCompositionNutrientRepository } from '../../delete-composition-nutrient/repository';
import { UpdateCompositionNutrientDTO } from '../dtos';
import { UpdateCompositionNutrientRepository } from '../repository';

type Filter = {
  toCreate: UpdateCompositionNutrientDTO[];
  toDelete: CompositionNutrient[];
  toUpdate: UpdateCompositionNutrientDTO[];
};

@Injectable()
export class UpdateCompositionNutrientService {
  constructor(
    private readonly createCompositionNutrient: CreateCompositionNutrientRepository,
    private readonly deleteCompositionNutrient: DeleteCompositionNutrientRepository,
    private readonly updateCompositionNutrient: UpdateCompositionNutrientRepository
  ) {}

  private filter(data: UpdateCompositionNutrientDTO[], composition: Composition): Filter {
    let toDelete = composition.nutrients;
    const toUpdate: UpdateCompositionNutrientDTO[] = [];
    const toCreate: UpdateCompositionNutrientDTO[] = [];

    while (data.length > 0) {
      const compNutrient = data.pop();

      if (!compNutrient) break;

      const matchCompNutrient = toDelete.find(
        ({ nutrientId }) => nutrientId === compNutrient.nutrientId
      );

      if (!matchCompNutrient) {
        toCreate.push(compNutrient);

        continue;
      }

      toUpdate.push(compNutrient);

      toDelete = toDelete.filter(({ nutrientId }) => nutrientId !== compNutrient.nutrientId);
    }

    return { toCreate, toDelete, toUpdate };
  }

  private create(data: UpdateCompositionNutrientDTO[]): Promise<CompositionNutrient[]> {
    return this.createCompositionNutrient.exec(data);
  }

  private delete(data: CompositionNutrient[]): Promise<DeleteResult>[] {
    return data.map(({ compositionId, nutrientId }) =>
      this.deleteCompositionNutrient.exec(compositionId, nutrientId)
    );
  }

  private update(data: UpdateCompositionNutrientDTO[]): Promise<UpdateResult>[] {
    return data.map(toUpdate => this.updateCompositionNutrient.exec(toUpdate));
  }

  public async exec(data: UpdateCompositionNutrientDTO[], composition: Composition): Promise<void> {
    const { toCreate, toDelete, toUpdate } = this.filter(data, composition);
    await Promise.all([this.create(toCreate), this.delete(toDelete), this.update(toUpdate)]);
  }
}
