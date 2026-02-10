import { FixturesRepository as FixturesRepositoryPort } from "../../../../domain/ports/Repositories";
import { FixtureDTO } from "../../../../domain/dto/Fixture";
import { FixtureModel } from "../models/FixtureModel";

export class FixturesRepository implements FixturesRepositoryPort {
  async upsertMany(fixtures: FixtureDTO[]): Promise<void> {
    if (fixtures.length === 0) return;
    const ops = fixtures.map((fixture) => ({
      updateOne: {
        filter: { seriesId: fixture.seriesId, matchId: fixture.matchId },
        update: { $set: fixture },
        upsert: true,
      },
    }));
    await FixtureModel.bulkWrite(ops, { ordered: false });
  }
}

