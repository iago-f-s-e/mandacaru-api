import { Body, Controller, Param, Put } from '@nestjs/common';
import { AlimentDTO } from '../../../dtos';
import { UpdateAlimentDTO } from '../dtos';
import { ValidateToUpdateAliment } from '../entity';
import { UpdateAlimentService } from '../service';

@Controller()
export class UpdateAlimentController {
  constructor(private readonly updateService: UpdateAlimentService) {}

  @Put(':id')
  public async exec(@Param('id') id: string, @Body() body: AlimentDTO): Promise<UpdateAlimentDTO> {
    const aliment = new ValidateToUpdateAliment({ ...body, id });

    const updateOrError = await this.updateService.exec(aliment.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
