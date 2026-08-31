import {
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusReceiver,
  ServiceBusSender,
} from '@azure/service-bus';
import { MessagingClient } from './messaging.interface';

export class ServiceBusClientAdapter implements MessagingClient {
  private client: ServiceBusClient;
  private senders: Map<string, ServiceBusSender> = new Map();
  //private sender: any;

  constructor() {
    this.client = new ServiceBusClient(process.env.SERVICE_MESSAGING_URL!);
  }

  /** 🔹 Get or create a sender for a given queue */
  private getSender(queueName: string): ServiceBusSender {
    if (!this.senders.has(queueName)) {
      const sender = this.client.createSender(queueName);
      this.senders.set(queueName, sender);
    }
    return this.senders.get(queueName)!;
  }

  /** 🔹 Emit (fire-and-forget) a single message */
  async emit<T>(pattern: string, data: T, queueName: string): Promise<void> {
    const sender = this.getSender(queueName);

    const message: ServiceBusMessage = {
      body: { pattern, data },
      applicationProperties: { pattern },
    };

    await sender.sendMessages(message);
  }

  /** 🔹 Emit a batch of messages efficiently */
  async emitBatch<T>(
    pattern: string,
    dataArray: T[],
    queueName: string,
  ): Promise<void> {
    const sender = this.getSender(queueName);
    let batch = await sender.createMessageBatch();

    for (const data of dataArray) {
      const message: ServiceBusMessage = {
        body: { pattern, data },
        applicationProperties: { pattern },
      };

      if (!batch.tryAddMessage(message)) {
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();
        if (!batch.tryAddMessage(message)) {
          console.error('❌ Message too large to send.');
        }
      }
    }

    if (batch.count > 0) {
      await sender.sendMessages(batch);
    }

    console.log(`✅ Sent ${dataArray.length} messages to queue: ${queueName}`);
  }

  /** 🔹 Send a message expecting a response (optional RPC pattern) */
  async send<T, R>(pattern: string, data: T, queueName: string): Promise<R> {
    const sender = this.getSender(queueName);
    await sender.sendMessages({
      body: { pattern, data },
      applicationProperties: { pattern },
    });
    // Azure SB doesn't support direct reply — must use reply queue if needed.
    return {} as R;
  }

  /** 🔹 Subscribe to a queue and handle messages */
  async subscribe<T>(
    queueName: string,
    handler: (data: T) => Promise<void>,
  ): Promise<void> {
    const receiver: ServiceBusReceiver = this.client.createReceiver(queueName);

    receiver.subscribe({
      processMessage: async (message) => {
        try {
          await handler(message.body as T);
        } catch (err) {
          console.error(`❌ Error processing message from ${queueName}:`, err);
        }
      },
      processError: async (err) => {
        console.error(`⚠️ Receiver error on ${queueName}:`, err);
      },
    });

    console.log(`🎧 Subscribed to queue: ${queueName}`);
  }

  // async emitBatch<T>(
  //   pattern: string,
  //   dataArray: T[],
  //   queueName: string,
  // ): Promise<void> {
  //   const sender = this.getSender(queueName);
  //   // 1. Create an empty batch object
  //   let messageBatch = await sender.createMessageBatch();

  //   let messagesSent = 0;

  //   for (let i = 0; i < dataArray.length; i++) {
  //     const data = dataArray[i];

  //     // Wrap the payload (data) and the routing key (pattern) into a ServiceBusMessage
  //     const message: ServiceBusMessage = {
  //       body: { pattern, data },
  //       // Add custom properties if needed for filtering
  //       applicationProperties: {
  //         pattern: pattern,
  //       },
  //     };

  //     // 2. Try to add the message to the current batch
  //     if (!messageBatch.tryAddMessage(message)) {
  //       // If the message doesn't fit, send the current batch first.
  //       if (messageBatch.count === 0) {
  //         // This means the single message itself is too large for the max batch size.
  //         // In a production app, you should log a critical error here or skip the message.
  //         console.error(
  //           `Message at index ${i} is too large to fit in any batch..`,
  //         );
  //         continue;
  //       }

  //       // 3. Send the full batch
  //       console.log(`Sending batch with ${messageBatch.count} messages...`);
  //       await this.sender.sendMessages(messageBatch);
  //       messagesSent += messageBatch.count;

  //       // 4. Start a new batch for the message that didn't fit (and the rest of the array)
  //       messageBatch = await this.sender.createMessageBatch();

  //       // Try to add the current message again (it must fit, or we would have errored above)
  //       if (!messageBatch.tryAddMessage(message)) {
  //         // Should not happen if the single message fit check above was correct.
  //         console.error(
  //           `Fatal: Message still too large after creating new batch.`,
  //         );
  //         continue;
  //       }
  //     }
  //   }

  //   // 5. Send any remaining messages in the final, non-full batch
  //   if (messageBatch.count > 0) {
  //     console.log(`Sending final batch with ${messageBatch.count} messages...`);
  //     await this.sender.sendMessages(messageBatch);
  //     messagesSent += messageBatch.count;
  //   }

  //   console.log(
  //     `Successfully batched and sent ${messagesSent} messages in total.`,
  //   );
  // }

  // async send<T, R>(pattern: string, data: T): Promise<R> {
  //   await this.sender.sendMessages({
  //     body: { pattern, data },
  //   });
  //   // Service Bus doesn’t support direct request/response like RabbitMQ
  //   // You’d need a reply queue or use emit for fire-and-forget
  //   return {} as R;
  // }

  // async emit<T>(pattern: string, data: T, queueName: string): Promise<void> {
  //   const sender = this.getSender(queueName);
  //   const message: ServiceBusMessage = {
  //     body: { pattern, data },
  //     applicationProperties: { pattern },
  //   };
  //   await sender.sendMessages(message);
  // }

  // async subscribe<T>(
  //   pattern: string,
  //   handler: (data: T) => Promise<void>,
  // ): Promise<void> {
  //   const receiver: ServiceBusReceiver = this.client.createReceiver(pattern);

  //   receiver.subscribe({
  //     processMessage: async (message) => {
  //       try {
  //         await handler(message.body as T);
  //       } catch (err) {
  //         console.error(`Error processing message:`, err);
  //       }
  //     },
  //     processError: async (err) => {
  //       console.error(`ASB subscription error:`, err);
  //     },
  //   });
  // }
}
