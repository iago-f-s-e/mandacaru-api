import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetReference } from '../../../types/get-reference';
import { ListReferenceDTO } from '../dtos';
import { FindReferenceService } from '../service';

@Controller()
export class FindReferenceController {
  constructor(private readonly findService: FindReferenceService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): GetReference {
    const referenceOrError = await this.findService.byId(id);

    if (referenceOrError.isLeft()) throw referenceOrError.value;

    return referenceOrError.value;
  }

  @Get('')
  public async exec(@Query() filter: ListReferenceDTO): GetReference {
    return this.findService.exec(filter);
  }
}
