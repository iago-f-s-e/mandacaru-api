import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetAliment } from '../../../types';
import { ListAliment } from '../dtos';
import { FindAlimentService } from '../service';

@Controller()
export class FindAlimentController {
  constructor(private readonly findService: FindAlimentService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): GetAliment {
    const alimentOrError = await this.findService.byId(id);

    if (alimentOrError.isLeft()) throw alimentOrError.value;

    return alimentOrError.value;
  }

  @Get()
  public exec(@Query() filter: ListAliment): GetAliment {
    return this.findService.exec(filter);
  }
}
