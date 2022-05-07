import { Body, Controller, Param, Put } from '@nestjs/common';
import { UserDTO } from '../../../dtos';
import { UpdateUserDTO } from '../dtos';
import { ValidateToUpdateUser } from '../entity';
import { UpdateUserService } from '../service';

@Controller()
export class UpdateUserController {
  constructor(private readonly updateService: UpdateUserService) {}

  @Put(':id')
  public async exec(@Param('id') id: string, @Body() body: UserDTO): Promise<UpdateUserDTO> {
    const user = new ValidateToUpdateUser({ ...body, id });

    const updateOrError = await this.updateService.exec(user.value);

    if (updateOrError.isLeft()) throw updateOrError.value;

    return updateOrError.value;
  }
}
