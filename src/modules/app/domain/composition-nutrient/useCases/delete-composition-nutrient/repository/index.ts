import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class DeleteCompositionNutrientRepository {
  constructor(
    @InjectRepository(CompositionNutrient)
    private readonly compositionNutrient: Repository<CompositionNutrient>
  ) {}

  public exec(compositionId: string, nutrientId: string): Promise<DeleteResult> {
    return this.compositionNutrient.delete({ compositionId, nutrientId });
  }
}
