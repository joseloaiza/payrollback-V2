import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateReasonContractTerminationDto,
  UpdateReasonContractTerminationDto,
  FilterReasonContractTerminationDto,
} from '../dtos/resonContractTermination.dto';
import { BaseRepository } from 'src/database/base.repository';
import { ReasonContractTermination } from '../entities/reasonContractTerminination.entity';

@Injectable()
export class ReasonsContractTerminationRepository extends BaseRepository<
  ReasonContractTermination,
  CreateReasonContractTerminationDto,
  UpdateReasonContractTerminationDto,
  FilterReasonContractTerminationDto
> {
  constructor(
    @InjectRepository(ReasonContractTermination)
    repo: Repository<ReasonContractTermination>,
  ) {
    super(repo);
  }
}
