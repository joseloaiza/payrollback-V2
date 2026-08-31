import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollConstants } from '../entities/payrollConstants.entity';

@Injectable()
export class PayrollConstantsService implements OnApplicationBootstrap {
  private constants: Record<string, number>;
  private readonly logger = new Logger(PayrollConstantsService.name);
  constructor(
    @InjectRepository(PayrollConstants)
    private readonly payrollConstantsRepository: Repository<PayrollConstants>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.initialize();
      this.logger.log('Constants loaded successfully');
    } catch (error) {
      this.logger.error('Failed to load constants', error.stack);
    }
  }

  /**
   * Loads constants from the database into memory.
   * Can be called manually if the constants need to be refreshed dynamically.
   */
  async initialize(): Promise<void> {
    const constants = await this.payrollConstantsRepository.find();
    this.constants = Object.fromEntries(
      constants.map(({ id, value }) => [id, value]),
    );
  }

  get_constants(): Record<string, number> {
    return this.constants;
  }

  get_constant_value(id: string): number {
    return this.constants[id];
  }

  get_constant_values(ids: string[]): number[] {
    return ids.map((id) => this.constants[id]);
  }
}
