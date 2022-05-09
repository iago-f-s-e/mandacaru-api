import { Controller, Delete, Param, ParseUUIDPipe } from '@nestjs/common';
import { DeleteUserSubjectService } from '../service';

@Controller()
export class DeleteUserSubjectController {
  constructor(private readonly deleteService: DeleteUserSubjectService) {}

  @Delete(':id')
  public async exec(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteService.exec(id);
  }
}
