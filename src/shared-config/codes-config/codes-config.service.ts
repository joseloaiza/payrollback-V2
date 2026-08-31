import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Codes_config } from 'src/database/entities/codes-config.entity';
import { CodesConfig } from '../entities/codes-config.entity';
import { Repository } from 'typeorm';

export interface ConfigCode {
  id: string;
  code: string;
  description: string;
  category: string;
}

@Injectable()
export class CodesConfigService implements OnApplicationBootstrap {
  private codesConfig: ConfigCode[] = [];
  private codesConfigMap: Record<string, string>;
  private readonly logger = new Logger(CodesConfigService.name);
  constructor(
    @InjectRepository(CodesConfig)
    private readonly repository: Repository<CodesConfig>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.loadConfig();
      this.logger.log('Codes config loaded successfully');
    } catch (error) {
      this.logger.error('Failed to load codes config', error.stack);
    }
  }
  async loadConfig() {
    try {
      const codes = await this.repository.find();
      this.codesConfig = codes.map((item) => {
        return {
          id: item.id,
          code: item.code,
          description: item.description,
          category: item.category,
        };
      });
      this.codesConfigMap = Object.fromEntries(
        codes.map(({ id, code }) => [id, code]),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /** ✅ Get all codes */
  getAllCodes(): ConfigCode[] {
    return this.codesConfig;
  }

  get_config_map(): Record<string, string> {
    return this.codesConfigMap;
  }

  get_one_cod(id: string): string {
    return this.codesConfigMap[id];
  }

  get_many_cod(ids: string[]): string[] {
    return ids.map((id) => this.codesConfigMap[id]);
  }

  /** ✅ Get item by code */
  getItemByCode(code: string): ConfigCode | undefined {
    return this.codesConfig.find((cc) => cc.code === code);
  }

  /** ✅ Get item by id */
  getItemById(id: string): ConfigCode | undefined {
    return this.codesConfig.find((cc) => cc.id === id);
  }

  /** ✅ Filter items dynamically */
  filterCodes(predicate: (item: ConfigCode) => boolean): ConfigCode[] {
    return this.codesConfig.filter(predicate);
  }

  filterCodesByset(idsToFind: string[]): ConfigCode[] {
    const idSet = new Set(idsToFind); // Convert array to Set for O(1) lookup
    return this.codesConfig.filter((config) => idSet.has(config.id));
  }

  async getCodes(idsConfig: string[]): Promise<Record<string, string>> {
    const codes = Promise.all(
      idsConfig.map(async (id) => {
        const param: ConfigCode = this.getItemById(id); // Ensure correct type
        return param.code; // Extract only the 'code' property
      }),
    );

    // Convert the array into an object with key-value pairs dynamically
    return idsConfig.reduce(
      (acc, id, index) => {
        acc[id] = codes[index];
        return acc;
      },
      {} as Record<string, string>,
    );
  }
}
