import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { signInChildren, SignInModule } from './useCases/sign-in';
import { signUpChildren, SignUpModule } from './useCases/sign-up';

@Module({
  imports: [SignInModule, SignUpModule]
})
export class AuthModule {}

export const authPrefix: RouteTree = {
  path: '/auth',
  module: AuthModule,
  children: [signInChildren, signUpChildren]
};
