import { Body, Controller, Param, Put } from '@nestjs/common';
import { NutrientDTO } from '../../../dtos';
import { UpdateNutrientDTO } from '../dtos';
import { ValidateToUpdateNutrient } from '../entity';
import { UpdateNutrientService } from '../service';

@Controller()
export class UpdateNutrientController {
  constructor(private readonly updateService: UpdateNutrientService) {}

  @Put(':id')
  public async exec(
    @Param('id') id: string,
    @Body() body: NutrientDTO
  ): Promise<UpdateNutrientDTO> {
    const nutrient = new ValidateToUpdateNutrient({ ...body, id });

    const updateOrError = await this.updateService.exec(nutrient.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
