import { Body, Controller, Post } from '@nestjs/common';
import { Reference } from '@src/modules/database/entities';
import { ReferenceDTO } from '../../../dtos';
import { ValidateToCreateReference } from '../entity';
import { CreateReferenceService } from '../service';

@Controller()
export class CreateReferenceController {
  constructor(private readonly createService: CreateReferenceService) {}

  @Post()
  public async exec(@Body() body: ReferenceDTO): Promise<Reference> {
    const reference = new ValidateToCreateReference(body);

    const createOrError = await this.createService.exec(reference.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
