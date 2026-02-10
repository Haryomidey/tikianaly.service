import { FixturesAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { FixturesRepository } from "../../domain/ports/Repositories";
import { IngestionService } from "./IngestionService";

const ALLOWED = new Set(["scheduled", "live", "finished"]);

export class FixturesIngestionService implements IngestionService {
  constructor(
    private readonly seriesId: string,
    private readonly client: CricketFeedClient,
    private readonly adapter: FixturesAdapter,
    private readonly repository: FixturesRepository,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    try {
      const payload = await this.client.getSeriesFixtures(this.seriesId);
      const fixtures = this.adapter
        .fromFixturesPayload(this.seriesId, payload)
        .filter((fixture) => ALLOWED.has(fixture.status));
      await this.repository.upsertMany(fixtures);
    } catch (error) {
      this.logger.error("Fixtures poll failed", { error, seriesId: this.seriesId });
      return;
    } finally {
      this.logger.info("Fixtures poll completed", { durationMs: Date.now() - start, seriesId: this.seriesId });
    }
  }
}

