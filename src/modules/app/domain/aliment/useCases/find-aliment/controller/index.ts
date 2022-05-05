import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Aliment } from '@src/modules/database/entities';
import { FindAlimentService } from '../service';

@Controller()
export class FindAlimentController {
  constructor(private readonly findService: FindAlimentService) {}

  @Get(':id')
  public async byId(@Param('id', new ParseUUIDPipe()) id: string): Promise<Aliment> {
    const alimentOrError = await this.findService.byId(id);

    if (alimentOrError.isLeft()) throw alimentOrError.value;

    return alimentOrError.value;
  }

  @Get()
  public exec(): Promise<Aliment[]> {
    return this.findService.exec();
  }
}
