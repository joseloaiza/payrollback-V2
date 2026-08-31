import { ApiQueryOptions } from '@nestjs/swagger';
import { getMetadataStorage } from 'class-validator';
import 'reflect-metadata';

export function generateApiQueryFromDto(dto: any): ApiQueryOptions[] {
  const metadataStorage = getMetadataStorage();

  const validationMetadatas = metadataStorage.getTargetValidationMetadatas(
    dto, // your DTO class
    '', // targetSchema (usually empty string)
    false, // always
    false, // strictGroup
  );

  const propertyNames = Array.from(
    new Set(validationMetadatas.map((meta) => meta.propertyName)),
  );

  return propertyNames.map((field) => ({
    name: field,
    required: false,
    type: Reflect.getMetadata('design:type', dto.prototype, field) || String,
    description: `Filter by ${field}`,
  }));
}
