import { Module } from '@nestjs/common';
import { RouteTree } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '@src/modules/database/entities';
import { UpdateRecipeModule } from '../update-recipe';
import { DeleteRecipeController } from './controller';
import { DeleteRecipeService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), UpdateRecipeModule],
  controllers: [DeleteRecipeController],
  providers: [DeleteRecipeService]
})
export class DeleteRecipeModule {}

export const deleteRecipeChildren: RouteTree = {
  path: '/',
  module: DeleteRecipeModule
};
