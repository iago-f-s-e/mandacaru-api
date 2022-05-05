import { maxSize } from '@src/modules/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { AlimentMeasure } from './aliment-measure';
import { BaseEntity } from './base-entity';
import { Composition } from './composition';

@Entity('reference')
export class Reference extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'reference_id' })
  public readonly id!: string;

  @Index('IDX_reference_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.REFERENCE_NAME })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.ABBREVIATION })
  public readonly abbreviation!: string;

  @Index('IDX_reference_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToMany(() => Composition, composition => composition.reference)
  public readonly compositions!: Composition[];

  @OneToMany(() => AlimentMeasure, alimentMeasures => alimentMeasures.reference)
  public readonly alimentMeasures!: AlimentMeasure[];
}
