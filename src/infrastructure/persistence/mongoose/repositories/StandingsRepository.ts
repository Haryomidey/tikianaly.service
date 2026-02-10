import { StandingsRepository as StandingsRepositoryPort } from "../../../../domain/ports/Repositories";
import { StandingDTO } from "../../../../domain/dto/Standing";
import { StandingModel } from "../models/StandingModel";

export class StandingsRepository implements StandingsRepositoryPort {
  async upsertMany(standings: StandingDTO[]): Promise<void> {
    if (standings.length === 0) return;
    const ops = standings.map((standing) => ({
      updateOne: {
        filter: { seriesId: standing.seriesId, teamId: standing.teamId },
        update: { $set: standing },
        upsert: true,
      },
    }));
    await StandingModel.bulkWrite(ops, { ordered: false });
  }
}

