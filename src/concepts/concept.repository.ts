import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateConceptDto,
  UpdateConceptDto,
  FilterConceptDto,
} from './concept.dto';
import { BaseRepository } from 'src/database/base.repository';
import { Concept } from './concept.entity';

@Injectable()
export class ConceptRepository extends BaseRepository<
  Concept,
  CreateConceptDto,
  UpdateConceptDto,
  FilterConceptDto
> {
  constructor(
    @InjectRepository(Concept)
    repo: Repository<Concept>,
  ) {
    super(repo);
  }

  async getConceptsBase(): Promise<Concept[]> {
    return await this.repo.find({
      where: { company_id: null },
    });
  }

  async getConceptsCalculateByCompany(company_id: string): Promise<Concept[]> {
    const concepts = this.repo.find({
      where: {
        company_id,
        isCalculated: true,
      },
    });

    return concepts;
  }

  async getNoveltyConceptsByCompany(
    company_id: string,
    conceptGroup: string,
  ): Promise<Concept[]> {
    return await this.repo.find({
      where: {
        company_id,
        conceptGroup,
        isNovelty: true,
      },
    });
  }

  async getNoveltyConceptsOverTimeByCompany(
    company_id: string,
  ): Promise<Concept[]> {
    const concepts = await this.repo.find({
      where: {
        company_id,
        isOverTime: true,
      },
    });

    return concepts;
  }

  async getConceptsByCompany(companyId: string): Promise<Concept[]> {
    return await this.repo.findBy({ company_id: companyId });
  }
}
