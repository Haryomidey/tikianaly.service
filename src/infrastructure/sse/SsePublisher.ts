import { Publisher } from "../../domain/ports/Publisher";

export interface SseTransport {
  publish(topic: string, payload: unknown): Promise<void>;
}

export class SsePublisher implements Publisher {
  constructor(private readonly transport: SseTransport) {}

  publish(topic: string, payload: unknown): Promise<void> {
    return this.transport.publish(topic, payload);
  }
}

