import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Aliment } from './aliment';
import { BaseEntity } from './base-entity';
import { CompositionNutrient } from './composition-nutrient';
import { Reference } from './reference';

@Entity('composition')
export class Composition extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'composition_id' })
  public readonly id!: string;

  @Column({ type: 'uuid', name: 'aliment_id' })
  public readonly alimentId!: string;

  @Column({ type: 'uuid', name: 'reference_id' })
  public readonly referenceId!: string;

  @Column({ type: 'float' })
  public readonly quantity!: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToOne(() => Aliment, aliment => aliment.composition, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'aliment_id', referencedColumnName: 'id' })
  public readonly aliment!: Aliment;

  @ManyToOne(() => Reference, reference => reference.compositions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'reference_id', referencedColumnName: 'id' })
  public readonly reference!: Reference;

  @OneToMany(() => CompositionNutrient, nutrients => nutrients.composition, { cascade: true })
  public readonly nutrients!: CompositionNutrient[];
}
