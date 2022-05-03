import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Nutrient } from '@src/modules/database/entities';
import { FindNutrientService } from '../service';

@Controller()
export class FindNutrientController {
  constructor(private readonly findService: FindNutrientService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): Promise<Nutrient> {
    const nutrientOrError = await this.findService.byId(id);

    if (nutrientOrError.isLeft()) throw nutrientOrError.value;

    return nutrientOrError.value;
  }

  @Get()
  public exec(): Promise<Nutrient[]> {
    return this.findService.exec();
  }
}
