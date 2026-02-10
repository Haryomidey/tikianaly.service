import { StandingsAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { StandingsRepository } from "../../domain/ports/Repositories";
import { IngestionService } from "./IngestionService";

export class StandingsIngestionService implements IngestionService {
  constructor(
    private readonly seriesId: string,
    private readonly client: CricketFeedClient,
    private readonly adapter: StandingsAdapter,
    private readonly repository: StandingsRepository,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    try {
      const payload = await this.client.getSeriesStandings(this.seriesId);
      const standings = this.adapter.fromStandingsPayload(this.seriesId, payload);
      await this.repository.upsertMany(standings);
    } catch (error) {
      this.logger.error("Standings poll failed", { error, seriesId: this.seriesId });
      return;
    } finally {
      this.logger.info("Standings poll completed", { durationMs: Date.now() - start, seriesId: this.seriesId });
    }
  }
}

