import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Aliment } from './aliment';
import { BaseEntity } from './base-entity';
import { CookingMeasure } from './cooking-measure';
import { RecipeComposition } from './recipe-composition';
import { Reference } from './reference';

@Entity('aliment_measure')
export class AlimentMeasure extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'aliment_measure_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'aliment_id' })
  public readonly alimentId!: string;

  @Column({ type: 'uuid', name: 'measure_id' })
  public readonly measureId!: string;

  @Column({ type: 'uuid', name: 'reference_id' })
  public readonly referenceId!: string;

  @Column({ type: 'float', name: 'quantity' })
  public readonly quantity!: number;

  @Index('IDX_aliment_measure_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @ManyToOne(() => Aliment, aliment => aliment.measures, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'aliment_id', referencedColumnName: 'id' })
  public readonly aliment!: Aliment;

  @ManyToOne(() => CookingMeasure, measure => measure.aliments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'measure_id', referencedColumnName: 'id' })
  public readonly measure!: CookingMeasure;

  @ManyToOne(() => Reference, reference => reference.alimentMeasures, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'reference_id', referencedColumnName: 'id' })
  public readonly reference!: Reference;

  @OneToMany(() => RecipeComposition, recipes => recipes.alimentMeasure)
  public readonly recipes!: RecipeComposition[];
}
