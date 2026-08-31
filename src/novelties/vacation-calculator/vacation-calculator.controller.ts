import { Body, Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import {
  CalculateVacationDto,
  VacationCalculationResponseDto,
} from '../dtos/calculate-vacation.dto';
import { VacationCalculatorService } from './vacation-calculator.service';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Permission } from 'src/auth/enums/permission.enum';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';

@UseGuards(PermissionsGuard)
@ApiTags('vacation-calculator')
@Controller('novelties/vacation-calculator')
export class VacationCalculatorController {
  constructor(private readonly service: VacationCalculatorService) {}

  @RequirePermissions(Permission.NOVELTIES_MANAGE_VACATIONS)
  @Endpoint({
    method: 'POST',
    summary:
      'Calcula los días hábiles de disfrute de vacaciones y la fecha de regreso.',
    route: '',
    body: CalculateVacationDto,
    responses: [
      {
        status: 200,
        description: 'Cálculo de vacaciones exitoso.',
        type: VacationCalculationResponseDto,
      },
      {
        status: 400,
        description: 'Datos de entrada inválidos.',
        type: ExceptionResponse,
      },
      {
        status: 404,
        description: 'Empleado sin jornada laboral registrada.',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Error del servidor.',
        type: ExceptionResponse,
      },
    ],
  })
  calculate(
    @Body() dto: CalculateVacationDto,
  ): Promise<VacationCalculationResponseDto> {
    return this.service.calculate(dto);
  }
}
