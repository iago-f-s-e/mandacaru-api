import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { maxSize } from '@src/modules/common/constants';
import { BaseEntity } from './base-entity';
import { AlimentMeasure } from './aliment-measure';

@Entity('cooking_measure')
export class CookingMeasure extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'cooking_measure_id' })
  public readonly id!: string;

  @Index('IDX_cooking_measure_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.NUTRIENT_NAME })
  public readonly name!: string;

  @Index('IDX_cooking_measure_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToMany(() => AlimentMeasure, aliments => aliments.measure)
  public readonly aliments!: AlimentMeasure[];
}
