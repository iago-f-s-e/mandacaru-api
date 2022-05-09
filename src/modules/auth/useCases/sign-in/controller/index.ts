import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CredentialsDTO, LoggedUserDTO } from '@src/modules/auth/dtos';
import { SignInService } from '../service';

@Controller()
export class SignInController {
  constructor(private readonly service: SignInService) {}

  @Post()
  public async exec(@Body() body: CredentialsDTO): Promise<LoggedUserDTO> {
    if (!body?.email || !body?.password) throw new UnauthorizedException();

    const loggedOrError = await this.service.exec(body);

    if (loggedOrError.isLeft()) throw loggedOrError.value;

    return loggedOrError.value;
  }
}
