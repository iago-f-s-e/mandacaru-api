import { Injectable } from '@nestjs/common';
import { UpdateReferenceRepository } from '../../update-reference/repository';

@Injectable()
export class DeleteReferenceService {
  constructor(private readonly updateReference: UpdateReferenceRepository) {}

  public async exec(id: string): Promise<void> {
    await this.updateReference.inactive(id);
  }
}
