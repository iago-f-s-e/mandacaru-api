import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeController } from './controller';
import { FindRecipeRepository } from './repository';
import { FindRecipeService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  exports: [FindRecipeRepository],
  controllers: [FindRecipeController],
  providers: [FindRecipeRepository, FindRecipeService]
})
export class FindRecipeModule {}

export const findRecipeChildren: RouteTree = {
  path: '/',
  module: FindRecipeModule
};
