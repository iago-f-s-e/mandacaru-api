import { maxSize } from '@src/modules/common/constants';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base-entity';
import { RecipeComposition } from './recipe-composition';
import { Reference } from './reference';

@Entity('recipe')
@Index('IDX_recipe_name_reference', ['referenceId', 'name'], { unique: true })
export class Recipe extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'recipe_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'reference_id' })
  public readonly referenceId!: string;

  @Index('IDX_recipe_name', { unique: false })
  @Column({ type: 'varchar', name: 'name', length: maxSize.RECIPE_NAME })
  public readonly name!: string;

  @Column({ type: 'float', name: 'gram' })
  public readonly gram!: number;

  @Column({ type: 'text', name: 'preparation_method', nullable: true })
  public readonly preparationMethod!: string;

  @Index('IDX_recipe_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @OneToMany(() => RecipeComposition, compositions => compositions.recipe, { cascade: true })
  public readonly compositions!: RecipeComposition[];

  @ManyToOne(() => Reference, reference => reference.recipes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'reference_id', referencedColumnName: 'id' })
  public readonly reference!: Reference;
}
