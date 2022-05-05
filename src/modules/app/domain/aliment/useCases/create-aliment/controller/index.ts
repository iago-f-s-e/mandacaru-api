import { Body, Controller, Post } from '@nestjs/common';
import { Aliment } from '@src/modules/database/entities';
import { AlimentDTO } from '../../../dtos';
import { ValidateToCreateAliment } from '../entity';
import { CreateAlimentService } from '../service';

@Controller()
export class CreateAlimentController {
  constructor(private readonly createService: CreateAlimentService) {}

  @Post()
  public async exec(@Body() body: AlimentDTO): Promise<Aliment> {
    const aliment = new ValidateToCreateAliment(body);

    const createOrError = await this.createService.exec(aliment.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
