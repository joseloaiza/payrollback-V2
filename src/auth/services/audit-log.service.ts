import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';

export interface AuditLogEntry {
  userId?: string;
  action: string;
  resource?: string;
  resourceId?: string;
  companyId?: string;
  ipAddress?: string;
  userAgent?: string;
  requestBody?: Record<string, unknown>;
  responseStatus?: number;
  details?: Record<string, unknown>;
}

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
  ) {}

  log(entry: AuditLogEntry): void {
    this.auditLogRepo.save(entry).catch(() => {
      // Audit failures must never propagate
    });
  }
}
