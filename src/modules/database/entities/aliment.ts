import { maxSize } from '@src/modules/common/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { Composition } from './composition';

@Entity('aliment')
export class Aliment extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'aliment_id' })
  public readonly id!: string;

  @Index('IDX_aliment_name', { unique: true })
  @Column({ type: 'varchar', length: maxSize.ALIMENT_NAME })
  public readonly name!: string;

  @Index('IDX_aliment_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToOne(() => Composition, composition => composition.aliment, { cascade: true })
  public readonly composition!: Composition;
}
