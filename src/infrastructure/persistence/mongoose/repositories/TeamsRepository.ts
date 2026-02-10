import { TeamsRepository as TeamsRepositoryPort } from "../../../../domain/ports/Repositories";
import { TeamDTO } from "../../../../domain/dto/Team";
import { TeamModel } from "../models/TeamModel";

export class TeamsRepository implements TeamsRepositoryPort {
  async upsertMany(teams: TeamDTO[]): Promise<void> {
    if (teams.length === 0) return;
    const ops = teams.map((team) => ({
      updateOne: {
        filter: { providerTeamId: team.providerTeamId },
        update: { $set: team },
        upsert: true,
      },
    }));
    await TeamModel.bulkWrite(ops, { ordered: false });
  }
}

