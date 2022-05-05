import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteAlimentMeasureService } from '../service';

@Controller()
export class DeleteAlimentMeasureController {
  constructor(private readonly deleteService: DeleteAlimentMeasureService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
