import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetCookingMeasure } from '../../../types';
import { ListCookingMeasure } from '../dtos';
import { FindCookingMeasureService } from '../service';

@Controller()
export class FindCookingMeasureController {
  constructor(private readonly findService: FindCookingMeasureService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): GetCookingMeasure {
    const cookingMeasureOrError = await this.findService.byId(id);

    if (cookingMeasureOrError.isLeft()) throw cookingMeasureOrError.value;

    return cookingMeasureOrError.value;
  }

  @Get()
  public exec(@Query() filter: ListCookingMeasure): GetCookingMeasure {
    return this.findService.exec(filter);
  }
}
