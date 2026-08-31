import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper } from 'amqp-connection-manager';
import { ConsumeMessage } from 'amqplib';
import { MessagingClient } from './messaging.interface';

export class RabbitMQClient implements MessagingClient {
  private readonly connection: amqp.AmqpConnectionManager;
  private readonly channelWrappers: Map<string, ChannelWrapper> = new Map();

  constructor() {
    this.connection = amqp.connect([
      process.env.SERVICE_MESSAGING_URL || 'amqp://localhost:5672',
    ]);

    this.connection.on('connect', () => {
      console.log('✅ Connected to RabbitMQ');
    });
    this.connection.on('disconnect', ({ err }) => {
      console.error('⚠️ RabbitMQ disconnected:', err?.message);
    });
  }

  private getChannel(queueName: string): ChannelWrapper {
    if (!this.channelWrappers.has(queueName)) {
      const channelWrapper = this.connection.createChannel({
        json: true,
        setup: (channel) => channel.assertQueue(queueName, { durable: true }),
      });
      this.channelWrappers.set(queueName, channelWrapper);
    }
    return this.channelWrappers.get(queueName)!;
  }

  async emit<T>(pattern: string, data: T, queueName: string): Promise<void> {
    const channelWrapper = this.getChannel(queueName);
    await channelWrapper.sendToQueue(
      queueName,
      { pattern, data },
      {
        persistent: true,
      },
    );
  }

  async emitBatch<T>(
    pattern: string,
    dataArray: T[],
    queueName: string,
  ): Promise<void> {
    const channelWrapper = this.getChannel(queueName);

    await Promise.all(
      dataArray.map((data) =>
        channelWrapper.sendToQueue(
          queueName,
          { pattern, data },
          {
            persistent: true,
          },
        ),
      ),
    );

    console.log(`✅ Sent ${dataArray.length} messages to queue: ${queueName}`);
  }

  async send<T, R>(pattern: string, data: T, queueName: string): Promise<R> {
    await this.emit(pattern, data, queueName);
    // RabbitMQ fire-and-forget here — mirrors ServiceBusClientAdapter.send,
    // which likewise has no direct reply-request support without a dedicated reply queue.
    return {} as R;
  }

  async subscribe<T>(
    queueName: string,
    handler: (data: T) => Promise<void>,
  ): Promise<void> {
    const channelWrapper = this.connection.createChannel({
      json: true,
      setup: async (channel) => {
        await channel.assertQueue(queueName, { durable: true });
        await channel.consume(queueName, async (msg: ConsumeMessage | null) => {
          if (!msg) return;
          try {
            const content = JSON.parse(msg.content.toString());
            await handler(content as T);
            channel.ack(msg);
          } catch (err) {
            console.error(
              `❌ Error processing message from ${queueName}:`,
              err,
            );
            channel.nack(msg, false, false);
          }
        });
      },
    });
    this.channelWrappers.set(queueName, channelWrapper);

    console.log(`🎧 Subscribed to queue: ${queueName}`);
  }
}
