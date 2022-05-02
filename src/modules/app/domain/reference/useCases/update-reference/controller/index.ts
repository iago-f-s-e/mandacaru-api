import { Body, Controller, Param, Put } from '@nestjs/common';
import { ReferenceDTO } from '../../../dtos';
import { UpdateReferenceDTO } from '../dtos';
import { ValidateToUpdateReference } from '../entity';
import { UpdateReferenceService } from '../service';

@Controller()
export class UpdateReferenceController {
  constructor(private readonly updateService: UpdateReferenceService) {}

  @Put(':id')
  public async exec(
    @Param('id') id: string,
    @Body() body: ReferenceDTO
  ): Promise<UpdateReferenceDTO> {
    const reference = new ValidateToUpdateReference({ ...body, id });

    const updateOrError = await this.updateService.exec(reference.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
