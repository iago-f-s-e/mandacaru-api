import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteCookingMeasureService } from '../service';

@Controller()
export class DeleteCookingMeasureController {
  constructor(private readonly deleteService: DeleteCookingMeasureService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
