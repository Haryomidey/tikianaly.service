import { SeriesAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { SeriesRepository } from "../../domain/ports/Repositories";
import { IngestionService } from "./IngestionService";

export class SeriesIngestionService implements IngestionService {
  constructor(
    private readonly client: CricketFeedClient,
    private readonly adapter: SeriesAdapter,
    private readonly repository: SeriesRepository,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    try {
      const payload = await this.client.getTours();
      const series = this.adapter.fromToursPayload(payload);
      await this.repository.upsertMany(series);
    } catch (error) {
      this.logger.error("Series poll failed", { error });
      return;
    } finally {
      this.logger.info("Series poll completed", { durationMs: Date.now() - start });
    }
  }
}

