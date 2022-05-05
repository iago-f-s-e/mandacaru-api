import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { Repository } from 'typeorm';
import { CreateRecipeDTO } from '../dtos';

@Injectable()
export class CreateRecipeRepository {
  constructor(@InjectRepository(Recipe) private readonly aliment: Repository<Recipe>) {}

  public exec(data: CreateRecipeDTO): Promise<Recipe> {
    return this.aliment.save(this.aliment.create(data));
  }
}
