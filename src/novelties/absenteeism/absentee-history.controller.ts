import {
  Controller,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AbsenteeHistoryService } from './absentee-history.service';
import {
  CreateAbsenteeHistoryDto,
  FilterAbsenteeHistoryDto,
  ResponseAbsenteeHistoryDto,
  UpdateAbsenteeHistoryDto,
} from '../dtos/absentee-history.dto';
import { PaginatedResult } from '../../utils/interfaces/paginated-result.interface';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { generateApiQueryFromDto } from 'src/utils/generateApiQueryFromDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@Controller('absentee-history')
export class AbsenteeHistoryController {
  constructor(private readonly service: AbsenteeHistoryService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'POST',
    summary: 'Save absentee.',
    route: '',
    body: CreateAbsenteeHistoryDto, // <-- or use full ApiBodyOptions
    responses: [
      {
        status: 200,
        description: 'Absentee information saved.',
        type: CreateAbsenteeHistoryDto,
      },
      {
        status: 404,
        description: 'Absentee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'AbsenteeType error.',
        type: ExceptionResponse,
      },
    ],
  })
  create(@Body() createAbsenteeDto: CreateAbsenteeHistoryDto) {
    return this.service.add_absentee(createAbsenteeDto);
  }

  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves all absentee information.',
    route: 'get_all',
    queryParams: generateApiQueryFromDto(FilterAbsenteeHistoryDto),
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeHistoryDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async findAll(
    @Query() query: Partial<FilterAbsenteeHistoryDto>,
  ): Promise<PaginatedResult<ResponseAbsenteeHistoryDto>> {
    return await this.service.findAll(query);
  }

  @RequirePermissions(Permission.NOVELTIES_READ)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves absentee information.',
    route: ':id',
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeHistoryDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async findOne(@Param('id') id: string) {
    return await this.service.findOne(id);
  }
  @RequirePermissions(Permission.NOVELTIES_UPDATE)
  @Endpoint({
    method: 'PUT',
    summary: 'Update absentee information.',
    route: ':id',
    bodyType: UpdateAbsenteeHistoryDto,
    responses: [
      {
        status: 200,
        description: 'absenteeType information.',
        type: ResponseAbsenteeHistoryDto,
      },
      {
        status: 404,
        description: 'absenteeType not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async update(@Param('id') id: string, @Body() dto: UpdateAbsenteeHistoryDto) {
    return await this.service.update(id, dto);
  }
  @RequirePermissions(Permission.NOVELTIES_DELETE)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'GET',
    summary: 'Retrieves absentee information employees by period.',
    route: 'periods/employees',
    queryParams: generateApiQueryFromDto(FilterAbsenteeHistoryDto),
    responses: [
      {
        status: 200,
        description: 'absentee information.',
        type: ResponseAbsenteeHistoryDto,
      },
      {
        status: 404,
        description: 'absentee not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  @UseGuards(JwtAuthGuard)
  async absenteePeriodByEmployee(
    @Query() query: Partial<FilterAbsenteeHistoryDto>,
  ): Promise<PaginatedResult<ResponseAbsenteeHistoryDto>> {
    const { employee_id, iniDatePeriod, endDatePeriod } = query;
    const responseAbsenteeDto: ResponseAbsenteeHistoryDto[] =
      await this.service.get_absentees_period_by_employee(
        employee_id,
        iniDatePeriod,
        endDatePeriod,
      );
    return { data: responseAbsenteeDto, total: responseAbsenteeDto.length };
  }

  // @Get('periods/codes')
  // async AbsenteeismPeriodByCodes(
  //   @Query() query: Partial<FilterAbsenteeHistoryDto>,
  // ): Promise<PaginatedResult<ResponseAbsenteeHistoryDto>> {
  //   const { employee_id, iniDatePeriod, endDatePeriod, codes } = query;
  //   const responseAbsenteeDto: ResponseAbsenteeHistoryDto[] =
  //     await this.absenteeHistoryService.AbsenteeismPeriodByCodes(
  //       employee_id,
  //       iniDatePeriod,
  //       endDatePeriod,
  //       codes,
  //     );
  //   return { data: responseAbsenteeDto, total: responseAbsenteeDto.length };
  // }
}
