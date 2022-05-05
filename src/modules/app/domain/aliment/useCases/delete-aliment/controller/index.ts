import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteAlimentService } from '../service';

@Controller()
export class DeleteAlimentController {
  constructor(private readonly deleteService: DeleteAlimentService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
