import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { UpdateRecipeCompositionModule } from '../../../recipe-composition/useCases/update-recipe-composition';
import { FindRecipeModule } from '../find-recipe';
import { UpdateRecipeController } from './controller';
import { UpdateRecipeRepository } from './repository';
import { UpdateRecipeService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), FindRecipeModule, UpdateRecipeCompositionModule],
  exports: [UpdateRecipeRepository],
  controllers: [UpdateRecipeController],
  providers: [UpdateRecipeRepository, UpdateRecipeService]
})
export class UpdateRecipeModule {}

export const updateRecipeChildren: RouteTree = {
  path: '/',
  module: UpdateRecipeModule
};
