import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { CreateUserModule } from '@src/modules/app/user/useCases/create-user';
import { CommonModule } from '@src/modules/common';
import { SignUpController } from './controller';
import { SignUpService } from './service';

@Module({
  imports: [CreateUserModule, CommonModule],
  controllers: [SignUpController],
  providers: [SignUpService]
})
export class SignUpModule {}

export const signUpChildren: RouteTree = {
  path: '/sign-up',
  module: SignUpModule
};
