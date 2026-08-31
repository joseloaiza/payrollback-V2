import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  CreateSocialSecurityEntityDto,
  UpdateSocialSecurityEntityDto,
  FilterSocialSecurityEntityDto,
} from './../dtos/social-security-entity.dto';
import { BaseRepository } from 'src/database/base.repository';
import { SocialSecurityEntity } from '../entities/social-security-entity.entity';

@Injectable()
export class SocialSecurityEntityRepository extends BaseRepository<
  SocialSecurityEntity,
  CreateSocialSecurityEntityDto,
  UpdateSocialSecurityEntityDto,
  FilterSocialSecurityEntityDto
> {
  constructor(
    @InjectRepository(SocialSecurityEntity)
    repo: Repository<SocialSecurityEntity>,
  ) {
    super(repo);
  }
}
