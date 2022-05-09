import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { FindUserModule } from '@src/modules/app/user/useCases/find-user';
import { CommonModule } from '@src/modules/common';
import { SignInController } from './controller';
import { SignInService } from './service';

@Module({
  imports: [FindUserModule, CommonModule],
  controllers: [SignInController],
  providers: [SignInService]
})
export class SignInModule {}

export const signInChildren: RouteTree = {
  path: '/sign-in',
  module: SignInModule
};
