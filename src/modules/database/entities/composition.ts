import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { CompositionNutrient } from './composition-nutrient';

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

  @OneToMany(() => CompositionNutrient, nutrients => nutrients.composition, { cascade: true })
  public readonly nutrients!: CompositionNutrient[];
}
