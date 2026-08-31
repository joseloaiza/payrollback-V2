import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { AuditLog } from '../../auth/entities/audit-log.entity';
import {
  AUDIT_ACTION_KEY,
  AUDIT_RESOURCE_KEY,
} from '../../auth/decorators/audit.decorator';

const SENSITIVE_FIELDS = [
  'password',
  'refreshToken',
  'token',
  'secret',
  'newPassword',
  'oldPassword',
  'resetToken',
];

function sanitize(obj: Record<string, unknown>): Record<string, unknown> {
  if (!obj || typeof obj !== 'object') return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      SENSITIVE_FIELDS.includes(k) ? '[REDACTED]' : v,
    ]),
  );
}

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const action = this.reflector.get<string>(
      AUDIT_ACTION_KEY,
      context.getHandler(),
    );
    const resource = this.reflector.get<string>(
      AUDIT_RESOURCE_KEY,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const ipAddress =
      req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim();
    const userAgent = req.headers['user-agent'];
    const sanitizedBody = req.body ? sanitize({ ...req.body }) : undefined;

    return next.handle().pipe(
      tap({
        next: () => {
          this.auditLogRepo
            .save({
              userId: user?.id ?? null,
              action: action ?? 'UNKNOWN',
              resource: resource ?? null,
              ipAddress,
              userAgent,
              requestBody: sanitizedBody,
              responseStatus: context.switchToHttp().getResponse().statusCode,
            })
            .catch(() => {
              // Audit failures must never break the main request
            });
        },
        error: (err) => {
          this.auditLogRepo
            .save({
              userId: user?.id ?? null,
              action: action ?? 'UNKNOWN',
              resource: resource ?? null,
              ipAddress,
              userAgent,
              requestBody: sanitizedBody,
              responseStatus: err.status ?? 500,
              details: { error: err.message },
            })
            .catch(() => {});
        },
      }),
    );
  }
}
