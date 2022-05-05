import { Body, Controller, Post } from '@nestjs/common';
import { AlimentMeasure } from '@src/modules/database/entities';
import { AlimentMeasureDTO } from '../../../dtos';
import { ValidateToCreateAlimentMeasure } from '../entity';
import { CreateAlimentMeasureService } from '../service';

@Controller()
export class CreateAlimentMeasureController {
  constructor(private readonly createService: CreateAlimentMeasureService) {}

  @Post()
  public async exec(@Body() body: AlimentMeasureDTO): Promise<AlimentMeasure> {
    const alimentMeasure = new ValidateToCreateAlimentMeasure(body);

    const createOrError = await this.createService.exec(alimentMeasure.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
