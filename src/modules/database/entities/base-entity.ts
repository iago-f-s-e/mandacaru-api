import { BeforeInsert } from 'typeorm';
import { randomUUID } from 'crypto';

const newID = (): string => randomUUID();

export class BaseEntity {
  public id!: string;

  @BeforeInsert()
  private setId(): void {
    this.id = newID();
  }
}
