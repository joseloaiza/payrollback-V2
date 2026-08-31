import {
  Inject,
  Injectable,
  LoggerService,
  OnModuleInit,
} from '@nestjs/common';
import { MessagingClient } from 'src/messaging/messaging.interface';
import { PayrollJobRepository } from './payroll-job.repository';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
@Injectable()
export class PayrollStatusListener implements OnModuleInit {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject('MESSAGING_CLIENT') private readonly client: MessagingClient,
    private readonly jobRepo: PayrollJobRepository,
  ) {}

  async onModuleInit() {
    console.log(`queue for status ${process.env.PAYROLL_STATUS_QUEUE}`);
    await this.client.subscribe(
      process.env.PAYROLL_STATUS_QUEUE,
      async (msg) => {
        try {
          const { pattern, data } = msg;

          if (pattern !== 'payroll_status_updates') {
            this.logger.warn(`Unexpected pattern received: ${pattern}`);
            return;
          }

          const { jobId, employeeId, status, error } = data;
          this.logger.log(
            `📨 Received status update - Job: ${jobId}, Employee: ${employeeId}, Status: ${status}`,
          );
          const job = await this.jobRepo.findOne(jobId);
          if (!job) {
            this.logger.error(`❌ Job ${jobId} not found in database`);
            return;
          }

          if (status === 'completed') {
            job.processedCount += 1;
          } else if (status === 'failed') {
            job.status = 'failed';

            this.logger.error(
              `❌ Job ${jobId} failed for employee ${employeeId}: ${error}`,
            );
          }

          if (
            job.processedCount >= job.totalEmployees &&
            job.status !== 'failed'
          ) {
            job.status = 'completed';
            this.logger.log(`✅ Payroll job ${job.id} FULLY completed.`);
          }

          await this.jobRepo.update(job);
        } catch (err) {
          this.logger.error(
            `💥 Error processing status update: ${err.message}`,
            err.stack,
          );
          // Don't throw - we don't want to crash the listener
        }
      },
    );
  }
}
