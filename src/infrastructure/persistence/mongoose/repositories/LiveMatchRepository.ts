import { LiveMatchRepository as LiveMatchRepositoryPort } from "../../../../domain/ports/Repositories";
import { LiveMatchSnapshotDTO } from "../../../../domain/dto/Match";
import { LiveMatchModel } from "../models/LiveMatchModel";

export class LiveMatchRepository implements LiveMatchRepositoryPort {
  async upsert(snapshot: LiveMatchSnapshotDTO): Promise<void> {
    await LiveMatchModel.updateOne(
      { id: snapshot.id },
      { $set: snapshot },
      { upsert: true },
    );
  }
}

