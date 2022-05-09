import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ListSubject } from '@src/modules/app/subject/useCases/find-subject/dtos';
import { GetUserSubject } from '../../../types';
import { FindUserSubjectService } from '../service';

@Controller()
export class FindUserSubjectController {
  constructor(private readonly findService: FindUserSubjectService) {}

  @Get(':id')
  public async byId(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('userId', new ParseUUIDPipe()) userId: string
  ): GetUserSubject {
    const subjectOrError = await this.findService.byId(id, userId);

    if (subjectOrError.isLeft()) throw subjectOrError.value;

    return subjectOrError.value;
  }

  @Get()
  public exec(@Param('userId') userId: string, @Query() filter: ListSubject): GetUserSubject {
    return this.findService.exec(userId, filter);
  }
}
