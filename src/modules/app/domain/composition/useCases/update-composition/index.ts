import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Composition } from '@src/modules/database/entities';
import { UpdateCompositionNutrientModule } from '../../../composition-nutrient/useCases/update-composition-nutrient';
import { FindCompositionModule } from '../find-composition';
import { UpdateCompositionRepository } from './repository';
import { UpdateCompositionService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Composition]),
    FindCompositionModule,
    UpdateCompositionNutrientModule
  ],
  exports: [UpdateCompositionService],
  providers: [UpdateCompositionRepository, UpdateCompositionService]
})
export class UpdateCompositionModule {}
