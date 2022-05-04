import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateCompositionNutrientDTO } from '../dtos';

@Injectable()
export class CreateCompositionNutrientRepository {
  constructor(
    @InjectRepository(CompositionNutrient)
    private readonly compositionNutrient: Repository<CompositionNutrient>
  ) {}

  public exec(data: CreateCompositionNutrientDTO[]): Promise<CompositionNutrient[]> {
    return this.compositionNutrient.save(data);
  }
}
