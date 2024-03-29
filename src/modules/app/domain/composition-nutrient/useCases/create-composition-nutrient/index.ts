import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { CreateCompositionNutrientRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompositionNutrient])],
  exports: [CreateCompositionNutrientRepository],
  providers: [CreateCompositionNutrientRepository]
})
export class CreateCompositionNutrientModule {}
