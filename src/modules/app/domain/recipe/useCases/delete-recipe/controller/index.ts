import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteRecipeService } from '../service';

@Controller()
export class DeleteRecipeController {
  constructor(private readonly deleteService: DeleteRecipeService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
