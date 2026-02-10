import { SquadsAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { TeamsRepository } from "../../domain/ports/Repositories";
import { Publisher } from "../../domain/ports/Publisher";
import { IngestionService } from "./IngestionService";

export class SquadIngestionService implements IngestionService {
  constructor(
    private readonly seriesId: string,
    private readonly client: CricketFeedClient,
    private readonly adapter: SquadsAdapter,
    private readonly repository: TeamsRepository,
    private readonly publisher: Publisher,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    try {
      const payload = await this.client.getSeriesSquads(this.seriesId);
      const teams = this.adapter.fromSquadsPayload(this.seriesId, payload);
      await this.repository.upsertMany(teams);
      await this.publisher.publish(`cricket.series.${this.seriesId}.squads`, { seriesId: this.seriesId, teams });
    } catch (error) {
      this.logger.error("Squads poll failed", { error, seriesId: this.seriesId });
      return;
    } finally {
      this.logger.info("Squads poll completed", { durationMs: Date.now() - start, seriesId: this.seriesId });
    }
  }
}

