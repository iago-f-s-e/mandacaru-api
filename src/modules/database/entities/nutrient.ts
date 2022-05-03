import { maxSize } from '@src/modules/common/constants';
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity';

@Entity('nutrient')
export class Nutrient extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'nutrient_id' })
  public readonly id!: string;

  @Index('IDX_nutrient_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.NUTRIENT_NAME })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.ABBREVIATION })
  public readonly abbreviation!: string;

  @Column({ type: 'varchar', name: 'unit_measure', length: maxSize.UNIT_MEASURE })
  public readonly unitMeasure!: string;

  @Index('IDX_nutrient_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;
}
