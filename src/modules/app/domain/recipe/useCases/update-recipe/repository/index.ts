import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { Repository, UpdateResult } from 'typeorm';
import { UpdateRecipeDTO } from '../dtos';

@Injectable()
export class UpdateRecipeRepository {
  constructor(@InjectRepository(Recipe) private readonly recipe: Repository<Recipe>) {}

  public reactive(id: string): Promise<UpdateResult> {
    return this.recipe.update({ id }, { isActive: true });
  }

  public inactive(id: string): Promise<UpdateResult> {
    return this.recipe.update({ id }, { isActive: false });
  }

  public exec(data: Omit<UpdateRecipeDTO, 'compositions'>): Promise<UpdateResult> {
    return this.recipe.update({ id: data.id }, data);
  }
}
