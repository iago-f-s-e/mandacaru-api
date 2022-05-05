import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { CreateCompositionNutrientModule } from '../create-composition-nutrient';
import { DeleteCompositionNutrientModule } from '../delete';
import { UpdateCompositionNutrientRepository } from './repository';
import { UpdateCompositionNutrientService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompositionNutrient]),
    CreateCompositionNutrientModule,
    DeleteCompositionNutrientModule
  ],
  exports: [UpdateCompositionNutrientService],
  providers: [UpdateCompositionNutrientRepository, UpdateCompositionNutrientService]
})
export class UpdateCompositionNutrientModule {}
