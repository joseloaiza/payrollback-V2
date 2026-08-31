import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';
import { AuditLogInterceptor } from '../../common/interceptors/audit-log.interceptor';

export const AUDIT_ACTION_KEY = 'auditAction';
export const AUDIT_RESOURCE_KEY = 'auditResource';

export const Audit = (action: string, resource?: string) =>
  applyDecorators(
    SetMetadata(AUDIT_ACTION_KEY, action),
    SetMetadata(AUDIT_RESOURCE_KEY, resource ?? null),
    UseInterceptors(AuditLogInterceptor),
  );
