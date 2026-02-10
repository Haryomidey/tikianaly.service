import { IngestionService } from "../services/IngestionService";
import { Logger } from "../../domain/ports/Logger";

export type JobConfig = {
  name: string;
  intervalMs: number;
  service: IngestionService;
};

export class Scheduler {
  private timers = new Map<string, NodeJS.Timeout>();
  private running = new Set<string>();

  constructor(private readonly logger: Logger) {}

  register(job: JobConfig): void {
    if (this.timers.has(job.name)) {
      throw new Error(`Job already registered: ${job.name}`);
    }

    const tick = async () => {
      if (this.running.has(job.name)) {
        this.logger.warn("Skipping overlapping job", { job: job.name });
        return;
      }
      this.running.add(job.name);
      try {
        await job.service.run();
      } finally {
        this.running.delete(job.name);
      }
    };

    const timer = setInterval(tick, job.intervalMs);
    this.timers.set(job.name, timer);
    void tick();
  }

  async shutdown(): Promise<void> {
    for (const timer of this.timers.values()) {
      clearInterval(timer);
    }
    this.timers.clear();
    this.logger.info("Scheduler shutdown complete");
  }
}