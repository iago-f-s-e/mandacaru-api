import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { AlimentMeasure } from './aliment-measure';
import { Recipe } from './recipe';

@Entity('recipe_composition')
export class RecipeComposition {
  @PrimaryColumn({ type: 'uuid', name: 'recipe_id' })
  public readonly recipeId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'aliment_measure_id' })
  public readonly alimentMeasureId!: string;

  @Column({ type: 'float', name: 'quantity' })
  public readonly quantity!: number;

  @ManyToOne(() => Recipe, recipe => recipe.compositions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  public readonly recipe!: Recipe;

  @ManyToOne(() => AlimentMeasure, measure => measure.recipes, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'aliment_measure_id', referencedColumnName: 'id' })
  public readonly alimentMeasure!: AlimentMeasure;
}
