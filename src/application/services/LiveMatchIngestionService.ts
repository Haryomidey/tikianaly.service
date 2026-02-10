import { LiveScoreAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { LiveMatchRepository } from "../../domain/ports/Repositories";
import { Publisher } from "../../domain/ports/Publisher";
import { IngestionService } from "./IngestionService";

export class LiveMatchIngestionService implements IngestionService {
  constructor(
    private readonly client: CricketFeedClient,
    private readonly adapter: LiveScoreAdapter,
    private readonly repository: LiveMatchRepository,
    private readonly publisher: Publisher,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    const failures: Array<{ matchId: string; error: unknown }> = [];

    try {
      const payload = await this.client.getLiveScore();
      const snapshots = this.adapter.fromLiveScorePayload(payload);

      for (const snapshot of snapshots) {
        try {
          await this.repository.upsert(snapshot);
          await this.publisher.publish("cricket.live.scoreboard", snapshot);
          await this.publisher.publish(`cricket.live.match.${snapshot.matchId}`, snapshot);
        } catch (error) {
          failures.push({ matchId: snapshot.matchId, error });
        }
      }
    } catch (error) {
      this.logger.error("Live match poll failed", { error });
      return;
    } finally {
      const durationMs = Date.now() - start;
      this.logger.info("Live match poll completed", { durationMs, failures: failures.length });
    }

    if (failures.length > 0) {
      this.logger.warn("Live match partial failures", { failures });
    }
  }
}

