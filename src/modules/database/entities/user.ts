import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { myTransformer } from '../helpers';
import { BaseEntity } from './base-entity';
import { maxSize } from '@src/modules/common/constants';
import { UserRoles, userRoles, UserStatus, userStatus } from '@src/modules/common/types/entities';
import { Address } from './address';
import { Subject } from './subject';

@Entity('user')
@Index('IDX_user_email_status', ['email', 'status'], { unique: true })
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

  @Index('IDX_user_document', { unique: true })
  @Column({
    type: 'varchar',
    length: maxSize.CPF + maxSize.TRANSFORMER,
    unique: true,
    select: false,
    update: false,
    transformer: myTransformer
  })
  public readonly document!: string;

  @Index('IDX_user_status', { unique: false })
  @Column({ type: 'enum', enum: userStatus, default: 'TEMPORARY', select: false })
  public readonly status!: UserStatus;

  @Column({ type: 'enum', enum: userRoles })
  public readonly role!: UserRoles;

  @Column({ type: 'varchar', select: false })
  public readonly password!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'now()', select: false })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'now()', select: false })
  public readonly updatedAt!: Date;

  @OneToMany(() => Address, address => address.user, { cascade: true })
  public readonly address!: Address[];

  @OneToMany(() => Subject, subjects => subjects.user)
  public readonly subjects!: Subject[];
}
