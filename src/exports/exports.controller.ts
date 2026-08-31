import {
  Body,
  Controller,
  Param,
  ParseArrayPipe,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ExportsService } from './exports.service';
import { ExceptionResponse } from 'src/utils/ExceptionResponse';
import { Endpoint } from 'src/utils/decorators/Endpoint';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('exports')
export class ExportsController {
  constructor(private readonly service: ExportsService) {}
  @UseGuards(JwtAuthGuard)
  @Endpoint({
    method: 'POST',
    summary: 'Export  plain Text  Bancolombia.',
    route: ':id/:periodId',
    body: Array<string>,
    responses: [
      {
        status: 200,
        description: 'plain Text  Bancolombia exported.',
        type: StreamableFile,
      },
      {
        status: 404,
        description: 'Company not found',
        type: ExceptionResponse,
      },
      {
        status: 500,
        description: 'Server error.',
        type: ExceptionResponse,
      },
    ],
  })
  async create(
    @Param('id') id: string,
    @Param('periodId') periodId: string,
    @Body(new ParseArrayPipe({ items: String })) employees: Array<string>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    return this.service.streamFile(id, periodId, employees);
  }
}
