import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { CreateRecipeCompositionRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeComposition])],
  exports: [CreateRecipeCompositionRepository],
  providers: [CreateRecipeCompositionRepository]
})
export class CreateRecipeCompositionModule {}
