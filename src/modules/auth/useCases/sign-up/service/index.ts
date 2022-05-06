import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '@src/modules/app/user/useCases/create-user/dtos';
import { CreateUserService } from '@src/modules/app/user/useCases/create-user/service';
import { LoggedUserDTO } from '@src/modules/auth/dtos';
import { left, right } from '@src/modules/common/either';
import { TokenService } from '@src/modules/common/services';
import { CreateResponse } from '@src/modules/common/types/responses';

@Injectable()
export class SignUpService {
  constructor(
    private readonly userService: CreateUserService,
    private readonly tokenService: TokenService
  ) {}

  public async exec(data: CreateUserDTO): CreateResponse<LoggedUserDTO> {
    const createOrError = await this.userService.exec(data);

    if (createOrError.isLeft()) return left(createOrError.value);

    const user = createOrError.value;
    const token = this.tokenService.generate({ id: user.id });

    return right({ token, user });
  }
}
