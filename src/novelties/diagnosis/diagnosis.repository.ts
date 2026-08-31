import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateDiagnosisDto,
  UpdateDiagnosisDto,
  FilterDiagnosisDto,
} from './../dtos/diagnosis.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Diagnosis } from '../entities/diagnosis.entity';

@Injectable()
export class DiagnosisRepository extends BaseRepository<
  Diagnosis,
  CreateDiagnosisDto,
  UpdateDiagnosisDto,
  FilterDiagnosisDto
> {
  constructor(
    @InjectRepository(Diagnosis)
    repo: Repository<Diagnosis>,
  ) {
    super(repo);
  }
}
