import { PlayerProfileAdapter } from "../../domain/ports/Adapters";
import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { Logger } from "../../domain/ports/Logger";
import { PlayersRepository } from "../../domain/ports/Repositories";
import { IngestionService } from "./IngestionService";

export class PlayerProfileIngestionService implements IngestionService {
  constructor(
    private readonly profileId: string,
    private readonly client: CricketFeedClient,
    private readonly adapter: PlayerProfileAdapter,
    private readonly repository: PlayersRepository,
    private readonly logger: Logger,
  ) {}

  async run(): Promise<void> {
    const start = Date.now();
    try {
      const payload = await this.client.getPlayerProfile(this.profileId);
      const player = this.adapter.fromProfilePayload(payload);
      await this.repository.upsert(player);
    } catch (error) {
      this.logger.error("Player profile poll failed", { error, profileId: this.profileId });
      return;
    } finally {
      this.logger.info("Player profile poll completed", { durationMs: Date.now() - start, profileId: this.profileId });
    }
  }
}

