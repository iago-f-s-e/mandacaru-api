import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '@src/modules/app/user/dtos';
import { ValidateToCreateUser } from '@src/modules/app/user/useCases/create-user/entity';
import { LoggedUserDTO } from '@src/modules/auth/dtos';
import { SignUpService } from '../service';

@Controller()
export class SignUpController {
  constructor(private readonly service: SignUpService) {}

  @Post()
  public async exec(@Body() body: UserDTO): Promise<LoggedUserDTO> {
    const user = new ValidateToCreateUser(body);

    const createOrError = await this.service.exec(user.value);

    if (createOrError.isLeft()) throw createOrError.value;

    return createOrError.value;
  }
}
