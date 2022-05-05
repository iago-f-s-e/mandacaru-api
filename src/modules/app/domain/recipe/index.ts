import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { createRecipeChildren, CreateRecipeModule } from './useCases/create-recipe';
import { deleteRecipeChildren, DeleteRecipeModule } from './useCases/delete-recipe';
import { findRecipeChildren, FindRecipeModule } from './useCases/find-recipe';
import { updateRecipeChildren, UpdateRecipeModule } from './useCases/update-recipe';

@Module({
  imports: [CreateRecipeModule, DeleteRecipeModule, FindRecipeModule, UpdateRecipeModule]
})
export class RecipeModule {}

export const recipeChildren: RouteTree = {
  path: '/recipe',
  module: RecipeModule,
  children: [createRecipeChildren, deleteRecipeChildren, findRecipeChildren, updateRecipeChildren]
};
