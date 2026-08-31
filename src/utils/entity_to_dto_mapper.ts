// src/common/utils/entity-to-dto-mapper.ts

import { plainToInstance } from 'class-transformer';

export class EntityToDtoMapper {
  static mapToDto<Entity, Dto>(dtoClass: new () => Dto, entity: Entity): Dto {
    return plainToInstance(dtoClass, entity, {
      excludeExtraneousValues: false, // Include all matching fields
      enableImplicitConversion: true, // Convert primitives if needed
    });
  }

  static mapArrayToDto<Entity, Dto>(
    dtoClass: new () => Dto,
    entities: Entity[],
  ): Dto[] {
    return entities.map((entity) => this.mapToDto(dtoClass, entity));
  }
}
