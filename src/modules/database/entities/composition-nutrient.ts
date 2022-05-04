import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Composition } from './composition';
import { Nutrient } from './nutrient';

@Entity('composition_nutrient')
export class CompositionNutrient {
  @PrimaryColumn({ type: 'uuid', name: 'composition_id' })
  public readonly compositionId!: string;

  @PrimaryColumn({ type: 'uuid', name: 'nutrient_id' })
  public readonly nutrientId!: string;

  @Column({ type: 'float' })
  public readonly quantity!: number;

  @ManyToOne(() => Composition, composition => composition.nutrients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'composition_id', referencedColumnName: 'id' })
  public readonly composition!: Composition;

  @ManyToOne(() => Nutrient, nutrient => nutrient.compositions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'nutrient_id', referencedColumnName: 'id' })
  public readonly nutrient!: Nutrient;
}
