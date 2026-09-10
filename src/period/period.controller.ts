import {
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PeriodService } from './period.service';
import {
  CreatePeriodDto,
  FilterPeriodDto,
  ResponsePeriodDto,
} from './dto/period.dto';
import { PaginatedResult } from './../utils/interfaces/paginated-result.interface';
import { plainToInstance } from 'class-transformer';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('period')
export class PeriodController {
  constructor(private readonly service: PeriodService) {}

  @RequirePermissions(Permission.PAYROLL_MANAGE_PERIODS)
  @Get()
  async findAll(
    @Query() query: Partial<FilterPeriodDto>,
  ): Promise<PaginatedResult<ResponsePeriodDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.PAYROLL_MANAGE_PERIODS)
  @Post()
  async create(
    @Query(new ValidationPipe({ transform: true })) data: CreatePeriodDto,
  ) {
    return await this.service.create(data.company_id, data.year);
  }

  @RequirePermissions(Permission.PAYROLL_MANAGE_PERIODS)
  @Get('get_period_on_process')
  async get_period_on_process(
    @Query() query: { company_id: string },
  ): Promise<ResponsePeriodDto> {
    const { company_id } = query;
    const period = await this.service.getPeriodOnprocess(company_id);

    return plainToInstance(ResponsePeriodDto, period);
  }

  @RequirePermissions(Permission.PAYROLL_MANAGE_PERIODS)
  @Patch('update_period_status')
  async updatePeriodState(@Query() queryParams: any) {
    const { periodId, newStatusCode } = queryParams;
    return await this.service.updatePeriodStatus(periodId, newStatusCode);
  }
}
