import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';

@Module({})
export class SignUpModule {}

export const signUpChildren: RouteTree = {
  path: '/sign-up',
  module: SignUpModule
};
