import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { FindRecipeModule } from '../find-recipe';
import { UpdateRecipeModule } from '../update-recipe';
import { CreateRecipeController } from './controller';
import { CreateRecipeRepository } from './repository';
import { CreateRecipeService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), FindRecipeModule, UpdateRecipeModule],
  controllers: [CreateRecipeController],
  providers: [CreateRecipeRepository, CreateRecipeService]
})
export class CreateRecipeModule {}

export const createRecipeChildren: RouteTree = {
  path: '/',
  module: CreateRecipeModule
};
