import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { myTransformer } from '../helpers';
import { BaseEntity } from './base-entity';
import { maxSize } from '@src/modules/common/constants';
import { Status, UserRoles, userRoles } from '@src/modules/common/types/entities';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid', name: 'user_id' })
  public readonly id!: string;

  @Column({ type: 'varchar', length: maxSize.NAME })
  public readonly name!: string;

  @Column({ type: 'varchar', length: maxSize.SURNAME })
  public readonly surname!: string;

  @Index('IDX_user_email', { unique: true })
  @Column({ type: 'varchar', length: maxSize.EMAIL, unique: true })
  public readonly email!: string;

  @Column({ type: 'varchar', select: false })
  public readonly password!: string;

  @Index('IDX_user_cpf', { unique: true })
  @Column({
    type: 'varchar',
    length: maxSize.CPF + maxSize.TRANSFORMER,
    unique: true,
    select: false,
    update: false,
    transformer: myTransformer
  })
  public readonly cpf!: string;

  @Column({ type: 'smallint', default: 1, select: false })
  public readonly status!: Status;

  @Column({ type: 'enum', enum: userRoles })
  public readonly role!: UserRoles;

  @Index('IDX_user_is_active', { unique: false })
  @Column({ type: 'boolean', name: 'is_active', default: true, select: false })
  public readonly isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;
}
