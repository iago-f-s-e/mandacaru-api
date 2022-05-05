import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { DeleteRecipeCompositionRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeComposition])],
  exports: [DeleteRecipeCompositionRepository],
  providers: [DeleteRecipeCompositionRepository]
})
export class DeleteRecipeCompositionModule {}
