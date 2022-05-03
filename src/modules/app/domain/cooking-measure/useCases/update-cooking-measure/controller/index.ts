import { Body, Controller, Param, Put } from '@nestjs/common';
import { CookingMeasureDTO } from '../../../dtos';
import { UpdateCookingMeasureDTO } from '../dtos';
import { ValidateToUpdateCookingMeasure } from '../entity';
import { UpdateCookingMeasureService } from '../service';

@Controller()
export class UpdateCookingMeasureController {
  constructor(private readonly updateService: UpdateCookingMeasureService) {}

  @Put(':id')
  public async exec(
    @Param('id') id: string,
    @Body() body: CookingMeasureDTO
  ): Promise<UpdateCookingMeasureDTO> {
    const cookingMeasure = new ValidateToUpdateCookingMeasure({ ...body, id });

    const updateOrError = await this.updateService.exec(cookingMeasure.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
