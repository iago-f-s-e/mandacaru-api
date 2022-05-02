import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Reference } from '@src/modules/database/entities';
import { FindReferenceService } from '../service';

@Controller()
export class FindReferenceController {
  constructor(private readonly findService: FindReferenceService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): Promise<Reference> {
    const referenceOrError = await this.findService.byId(id);

    if (referenceOrError.isLeft()) throw referenceOrError.value;

    return referenceOrError.value;
  }

  @Get('')
  public async exec(): Promise<Reference[]> {
    return this.findService.exec();
  }
}
