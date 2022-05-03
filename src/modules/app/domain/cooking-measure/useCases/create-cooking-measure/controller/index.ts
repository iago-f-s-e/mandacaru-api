import { Body, Controller, Post } from '@nestjs/common';
import { CookingMeasure } from '@src/modules/database/entities';
import { CookingMeasureDTO } from '../../../dtos';
import { ValidateToCreateCookingMeasure } from '../entity';
import { CreateCookingMeasureService } from '../service';

@Controller()
export class CreateCookingMeasureController {
  constructor(private readonly createService: CreateCookingMeasureService) {}

  @Post()
  public async exec(@Body() body: CookingMeasureDTO): Promise<CookingMeasure> {
    const cookingMeasure = new ValidateToCreateCookingMeasure(body);

    const createOrError = await this.createService.exec(cookingMeasure.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
