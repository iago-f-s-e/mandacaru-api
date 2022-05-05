import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FindRecipeRepository {
  constructor(@InjectRepository(Recipe) private readonly recipe: Repository<Recipe>) {}

  public existing(name: string, referenceId: string): Promise<Recipe | null> {
    return this.recipe.findOne({
      where: { name, referenceId },
      select: {
        id: true,
        isActive: true
      }
    });
  }

  public byId(id: string): Promise<Recipe | null> {
    return this.recipe
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.name',
        'recipe.gram',
        'recipe.preparationMethod',
        'compositions.quantity',
        'alimentMeasure.id',
        'alimentMeasure.quantity',
        'reference.id',
        'reference.name',
        'aliment.id',
        'aliment.name',
        'measure.id',
        'measure.name'
      ])
      .innerJoin('recipe.compositions', 'compositions')
      .innerJoin('compositions.alimentMeasure', 'alimentMeasure', 'alimentMeasure.isActive = true')
      .innerJoin('alimentMeasure.measure', 'measure', 'measure.isActive = true')
      .innerJoin('alimentMeasure.aliment', 'aliment', 'aliment.isActive = true')
      .innerJoin('recipe.reference', 'reference', 'reference.isActive = true')
      .where('recipe.id = :id', { id })
      .andWhere('recipe.isActive = true')
      .getOne();
  }

  public exec(): Promise<Recipe[]> {
    return this.recipe
      .createQueryBuilder('recipe')
      .select(['recipe.id', 'recipe.name', 'recipe.gram', 'reference.name', 'reference.id'])
      .innerJoin('recipe.compositions', 'compositions')
      .innerJoin('compositions.alimentMeasure', 'alimentMeasure', 'alimentMeasure.isActive = true')
      .innerJoin('alimentMeasure.measure', 'measure', 'measure.isActive = true')
      .innerJoin('alimentMeasure.aliment', 'aliment', 'aliment.isActive = true')
      .innerJoin('recipe.reference', 'reference', 'reference.isActive = true')
      .where('recipe.isActive = true')
      .getMany();
  }
}
