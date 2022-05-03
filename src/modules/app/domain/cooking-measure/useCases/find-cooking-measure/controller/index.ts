import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { CookingMeasure } from '@src/modules/database/entities';
import { FindCookingMeasureService } from '../service';

@Controller()
export class FindCookingMeasureController {
  constructor(private readonly findService: FindCookingMeasureService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): Promise<CookingMeasure> {
    const cookingMeasureOrError = await this.findService.byId(id);

    if (cookingMeasureOrError.isLeft()) throw cookingMeasureOrError.value;

    return cookingMeasureOrError.value;
  }

  @Get()
  public exec(): Promise<CookingMeasure[]> {
    return this.findService.exec();
  }
}
