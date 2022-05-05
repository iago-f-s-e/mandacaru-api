import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeComposition } from '@src/modules/database/entities';
import { CreateRecipeCompositionModule } from '../create-recipe-composition';
import { DeleteRecipeCompositionModule } from '../delete-recipe-composition';
import { UpdateRecipeCompositionRepository } from './repository';
import { UpdateRecipeCompositionService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipeComposition]),
    CreateRecipeCompositionModule,
    DeleteRecipeCompositionModule
  ],
  exports: [UpdateRecipeCompositionService],
  providers: [UpdateRecipeCompositionRepository, UpdateRecipeCompositionService]
})
export class UpdateRecipeCompositionModule {}
