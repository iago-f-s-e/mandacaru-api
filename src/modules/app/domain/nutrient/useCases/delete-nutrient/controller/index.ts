import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteNutrientService } from '../service';

@Controller()
export class DeleteNutrientController {
  constructor(private readonly deleteService: DeleteNutrientService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
