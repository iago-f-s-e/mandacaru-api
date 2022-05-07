import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteUserService } from '../service';

@Controller()
export class DeleteUserController {
  constructor(private readonly deleteService: DeleteUserService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
