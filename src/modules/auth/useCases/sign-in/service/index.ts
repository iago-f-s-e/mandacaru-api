import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userToClient } from '@src/modules/app/user/helpers';
import { FindUserRepository } from '@src/modules/app/user/useCases/find-user/repository';
import { CredentialsDTO, LoggedUserDTO } from '@src/modules/auth/dtos';
import { left, right } from '@src/modules/common/either';
import { PassService, TokenService } from '@src/modules/common/services';
import { AuthResponse } from '@src/modules/common/types/responses';

@Injectable()
export class SignInService {
  constructor(
    private readonly findUser: FindUserRepository,
    private readonly passService: PassService,
    private readonly tokenService: TokenService
  ) {}

  public async exec(data: CredentialsDTO): Promise<AuthResponse<LoggedUserDTO>> {
    const found = await this.findUser.byEmail(data.email);

    if (!found) return left(new UnauthorizedException());

    if (!(await this.passService.isMatch(data.password, found.password)))
      return left(new UnauthorizedException());

    const user = userToClient(found);
    const token = this.tokenService.generate({ id: user.id });

    return right({ token, user });
  }
}
