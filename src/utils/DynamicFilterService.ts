import { Repository } from 'typeorm';
import { PaginatedResult } from './interfaces/paginated-result.interface';

export interface SearchOptions {
  // Optional joins to perform
  joins?: Array<{
    property: string; // property to join on (e.g., 'details')
    alias: string; // alias for the joined table (e.g., 'details')
    // Optionally, additional select columns for the join can be added here if needed
  }>;
  // Array of conditions (fully qualified) to OR together.
  // Each should contain ':search' as a placeholder.
  whereConditions: string[];
  // Array of columns to select. You can specify '*' or use aliases, e.g., 'employee', 'details.id'
  select: string[];
}
export class DynamicFilterService<Entity> {
  constructor(private readonly repository: Repository<Entity>) {}

  /**
   *
   * @param filters
   * @param page
   * @param limit
   * @returns
   */
  async filterEntities(
    filters: Record<string, any>, // Filters for main entity
    page,
    limit,
    relations: string[] = [], // Relations to join
    selectFields?: string[] | null, // Specific fields for main entity
    relationFields?: Record<string, string[]> | null, //Fields for relations
    fieldsToSearch?: string[], // fields where to apply the search
    search?: string, // value to search
    relationFilters?: Record<string, any> | null, // Filters for related entities
  ): Promise<PaginatedResult<Entity>> {
    let queryBuilder = this.repository.createQueryBuilder('entity');

    // ✅ Select specific fields only if provided
    if (selectFields && selectFields.length > 0) {
      queryBuilder.select(selectFields.map((field) => `entity.${field}`));
    }

    // ✅ Apply search condition
    if (search !== undefined && search !== null && fieldsToSearch?.length) {
      const whereClause = fieldsToSearch
        .map((field) => `entity.${field} ILIKE :search`)
        .join(' OR ');
      queryBuilder = queryBuilder.where(whereClause, { search: `%${search}%` });
    } else {
      // Apply dynamic filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'string' && value.includes('%')) {
            queryBuilder.andWhere(`entity.${key} LIKE :${key}`, {
              [key]: value,
            });
          } else if (Array.isArray(value)) {
            queryBuilder.andWhere(`entity.${key} IN (:...${key})`, {
              [key]: value,
            });
          } else {
            queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
          }
        }
      });
    }

    // ✅ Handle relations and selecting specific fields for them
    relations.forEach((relation) => {
      const alias = relation;
      // If specific fields are provided, use leftJoin instead of leftJoinAndSelect
      if (
        relationFields &&
        relationFields[relation] &&
        relationFields[relation].length > 0
      ) {
        queryBuilder.leftJoin(`entity.${relation}`, alias); // No "Select" to avoid all fields
        relationFields[relation].forEach((field) => {
          queryBuilder.addSelect(`${alias}.${field}`);
        });
      } else {
        // If no specific fields are provided, fetch all fields (default behavior)
        queryBuilder.leftJoinAndSelect(`entity.${relation}`, alias);
      }
    });

    if (relationFilters && Object.keys(relationFilters).length > 0) {
      Object.entries(relationFilters).forEach(([relation, conditions]) => {
        Object.entries(conditions).forEach(([field, value]) => {
          queryBuilder.andWhere(`${relation}.${field} = :${field}`, {
            [field]: value,
          });
        });
      });
    }

    // ✅ Apply filters for related entities
    if (relationFilters) {
      Object.entries(relationFilters).forEach(([relation, filters]) => {
        if (relations.includes(relation)) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryBuilder.andWhere(
                `${relation}.${key} = :${relation}_${key}`,
                {
                  [`${relation}_${key}`]: value,
                },
              );
            }
          });
        }
      });
    }

    // Apply pagination
    if (page && limit) queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    //return data
    return { data, total };
  }

  async filterSearch(
    mainAlias: string,
    search: string,
    options: SearchOptions,
    page,
    limit,
  ) {
    let qb = this.repository.createQueryBuilder(mainAlias);

    // Process optional joins
    if (options.joins) {
      for (const join of options.joins) {
        qb = qb.leftJoinAndSelect(`${mainAlias}.${join.property}`, join.alias);
      }
    }

    // Explicitly select columns
    qb = qb.select(options.select);

    // Build the WHERE clause by combining conditions with OR
    const whereClause = options.whereConditions.join(' OR ');
    qb = qb.where(whereClause, { search: `%${search}%` });
    if (page && limit) qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();
    return { data, total, page, limit };
  }
}
