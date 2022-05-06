import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GetNutrient } from '../../../types';
import { ListNutrientDTO } from '../dtos';
import { FindNutrientService } from '../service';

@Controller()
export class FindNutrientController {
  constructor(private readonly findService: FindNutrientService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): GetNutrient {
    const nutrientOrError = await this.findService.byId(id);

    if (nutrientOrError.isLeft()) throw nutrientOrError.value;

    return nutrientOrError.value;
  }

  @Get()
  public exec(@Query() filter: ListNutrientDTO): GetNutrient {
    return this.findService.exec(filter);
  }
}
