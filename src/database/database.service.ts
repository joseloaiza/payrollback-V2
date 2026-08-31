import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (this.dataSource.isInitialized) {
        this.logger.log('✅ Database connection established successfully');
      } else {
        await this.dataSource.initialize();
        this.logger.log('✅ Database connection established ( lazy init)');
      }
    } catch (error) {
      this.logger.error('❌ Database connection failed', error.stack);
      throw error;
    }
  }
}
