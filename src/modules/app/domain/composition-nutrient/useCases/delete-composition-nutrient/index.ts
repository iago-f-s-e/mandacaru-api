import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompositionNutrient } from '@src/modules/database/entities';
import { DeleteCompositionNutrientRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([CompositionNutrient])],
  exports: [DeleteCompositionNutrientRepository],
  providers: [DeleteCompositionNutrientRepository]
})
export class DeleteCompositionNutrientModule {}
