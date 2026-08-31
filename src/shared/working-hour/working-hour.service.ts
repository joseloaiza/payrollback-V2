import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from 'src/utils/interfaces/paginated-result.interface';
import { DynamicFilterService } from 'src/utils/DynamicFilterService';
import { WorkingHour } from './../entities/workin-hour.entity';
import {
  CreateWorkingHourDto,
  UpdateWorkingHourDto,
  FilterWorkingHourDto,
  ResponseWorkingHourDto,
} from './../dtos/working-hour.dto';

@Injectable()
export class WorkingHourService extends DynamicFilterService<WorkingHour> {
  constructor(
    @InjectRepository(WorkingHour)
    private readonly WorkingHourRepository: Repository<WorkingHour>,
  ) {
    super(WorkingHourRepository);
  }

  async findAll(
    queryFilters: FilterWorkingHourDto,
  ): Promise<PaginatedResult<ResponseWorkingHourDto>> {
    try {
      const { page, limit, ...filters } = queryFilters;
      const { data, total } = await this.filterEntities(filters, page, limit);
      const transformedData = plainToInstance(ResponseWorkingHourDto, data);
      return { data: transformedData, total };
    } catch (error) {
      throw new InternalServerErrorException('Database error occurred');
    }
  }

  async findOne(id: string): Promise<ResponseWorkingHourDto> {
    try {
      const entity = await this.WorkingHourRepository.findOne({
        where: { id },
      });
      if (!entity) {
        throw new NotFoundException('WorkingHour not found');
      }
      return plainToInstance(ResponseWorkingHourDto, entity);
    } catch (error) {
      throw new InternalServerErrorException('Error fetching WorkingHour');
    }
  }

  async create(dto: CreateWorkingHourDto): Promise<ResponseWorkingHourDto> {
    try {
      const newEntity = this.WorkingHourRepository.create(dto);
      const savedEntity = await this.WorkingHourRepository.save(newEntity);
      return plainToInstance(ResponseWorkingHourDto, savedEntity);
    } catch (error) {
      throw new InternalServerErrorException('Error creating WorkingHour');
    }
  }

  async update(
    id: string,
    dto: UpdateWorkingHourDto,
  ): Promise<ResponseWorkingHourDto> {
    try {
      const existingEntity = await this.WorkingHourRepository.findOne({
        where: { id },
      });
      if (!existingEntity) {
        throw new NotFoundException('WorkingHour not found');
      }
      Object.assign(existingEntity, dto);
      const updatedEntity =
        await this.WorkingHourRepository.save(existingEntity);
      return plainToInstance(ResponseWorkingHourDto, updatedEntity);
    } catch (error) {
      throw new InternalServerErrorException('Error updating WorkingHour');
    }
  }
  async delete(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const result = await this.WorkingHourRepository.delete(id);
      if (result.affected === 0) {
        return { success: false, message: 'WorkingHour not found' };
      }
      return { success: true, message: 'WorkingHour delete successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting WorkingHour');
    }
  }
}
