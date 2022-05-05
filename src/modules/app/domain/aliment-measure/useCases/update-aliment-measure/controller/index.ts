import { Body, Controller, Param, Put } from '@nestjs/common';
import { AlimentMeasureDTO } from '../../../dtos';
import { UpdateAlimentMeasureDTO } from '../dtos';
import { ValidateToUpdateAlimentMeasure } from '../entity';
import { UpdateAlimentMeasureService } from '../service';

@Controller()
export class UpdateAlimentMeasureController {
  constructor(private readonly updateService: UpdateAlimentMeasureService) {}

  @Put(':id')
  public async exec(
    @Param('id') id: string,
    @Body() body: AlimentMeasureDTO
  ): Promise<UpdateAlimentMeasureDTO> {
    const alimentMeasure = new ValidateToUpdateAlimentMeasure({ ...body, id });

    const updateOrError = await this.updateService.exec(alimentMeasure.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
