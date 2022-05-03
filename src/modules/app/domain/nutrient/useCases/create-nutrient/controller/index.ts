import { Body, Controller, Post } from '@nestjs/common';
import { Nutrient } from '@src/modules/database/entities';
import { NutrientDTO } from '../../../dtos';
import { ValidateToCreateNutrient } from '../entity';
import { CreateNutrientService } from '../service';

@Controller()
export class CreateNutrientController {
  constructor(private readonly createService: CreateNutrientService) {}

  @Post()
  public async exec(@Body() body: NutrientDTO): Promise<Nutrient> {
    const nutrient = new ValidateToCreateNutrient(body);

    const createOrError = await this.createService.exec(nutrient.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
