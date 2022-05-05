import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCompositionDTO } from '@src/modules/app/domain/composition/useCases/update-composition/dtos';
import { UpdateCompositionService } from '@src/modules/app/domain/composition/useCases/update-composition/service';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';
import { FindAlimentRepository } from '../../find-aliment/repository';
import { UpdateAlimentDTO } from '../dtos';
import { UpdateAlimentRepository } from '../repository';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateAlimentService {
  constructor(
    private readonly updateAliment: UpdateAlimentRepository,
    private readonly findAliment: FindAlimentRepository,
    private readonly updateCompositionService: UpdateCompositionService
  ) {}

  private errorMessage(data: UpdateAlimentDTO): Errors {
    return {
      conflict: `The name "${data.name}" already exists`,
      notFound: 'Aliment is not found'
    };
  }

  private updateComposition(composition: UpdateCompositionDTO): UpdateResponse<null> {
    return this.updateCompositionService.exec(composition);
  }

  public async exec(data: UpdateAlimentDTO): UpdateResponse<UpdateAlimentDTO> {
    const error = this.errorMessage(data);

    const [original, existing] = await Promise.all([
      this.findAliment.active(data.id),
      this.findAliment.existing(data.name)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!existing && existing.id !== data.id) return left(new ConflictException(error.conflict));

    const { composition, ...aliment } = data;

    const updateOrError = await this.updateComposition(composition);

    if (updateOrError.isLeft()) return left(updateOrError.value);

    await this.updateAliment.exec(aliment);

    return right(data);
  }
}
