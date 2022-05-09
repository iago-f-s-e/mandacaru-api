import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAddressDTO } from '@src/modules/app/address/useCases/update-address/dtos';
import { UpdateAddressService } from '@src/modules/app/address/useCases/update-address/service';
import { FindSubjectRepository } from '@src/modules/app/subject/useCases/find-subject/repository';
import { UpdateSubjectDTO } from '@src/modules/app/subject/useCases/update-subject/dtos';
import { UpdateSubjectRepository } from '@src/modules/app/subject/useCases/update-subject/repository';
import { left, right } from '@src/modules/common/either';
import { UpdateResponse } from '@src/modules/common/types/responses';

type Errors = {
  conflict: string;
  notFound: string;
};

@Injectable()
export class UpdateUserSubjectService {
  constructor(
    private readonly findSubject: FindSubjectRepository,
    private readonly updateSubject: UpdateSubjectRepository,
    private readonly updateAddressService: UpdateAddressService
  ) {}

  private async updateAddress(data: UpdateAddressDTO): Promise<void> {
    await this.updateAddressService.exec(data);
  }

  private errorMessage(data: UpdateSubjectDTO): Errors {
    return {
      conflict: `The email "${data.email}" already exists`,
      notFound: 'Reference is not found'
    };
  }

  public async exec(data: UpdateSubjectDTO): UpdateResponse<UpdateSubjectDTO> {
    const error = this.errorMessage(data);

    const [original, existing] = await Promise.all([
      this.findSubject.byId(data.id, data.userId),
      this.findSubject.existing(data.email, data.userId)
    ]);

    if (!original) return left(new NotFoundException(error.notFound));

    if (!!existing && existing.id !== data.id) return left(new ConflictException(error.conflict));

    const { address, ...user } = data;

    if (address) await this.updateAddress(address);

    await this.updateSubject.exec(user);

    return right(data);
  }
}
