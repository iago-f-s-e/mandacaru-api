import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteReferenceService } from '../service';

@Controller()
export class DeleteReferenceController {
  constructor(private readonly deleteService: DeleteReferenceService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
