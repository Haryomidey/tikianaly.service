import { SquadsAdapter } from "../../../domain/ports/Adapters";
import { TeamDTO } from "../../../domain/dto/Team";
import { stableId } from "../../../shared/utils/ids";

type GoalServeSquadsPayload = {
  squads?: {
    team?: Array<{
      id: string;
      name: string;
      short_name?: string;
      player?: Array<{ id: string; role?: string }>;
    }>;
  };
};

export class GoalServeSquadsAdapter implements SquadsAdapter {
  fromSquadsPayload(seriesId: string, payload: unknown): TeamDTO[] {
    const data = payload as GoalServeSquadsPayload;
    const teams = data.squads?.team ?? [];
    const now = new Date();

    return teams.map((team) => ({
      id: stableId("team", team.id),
      provider: "goalserve",
      providerTeamId: team.id,
      name: team.name,
      shortName: team.short_name ?? null,
      seriesId: stableId("series", seriesId),
      players: (team.player ?? []).map((player) => ({
        playerId: stableId("player", player.id),
        role: player.role ?? null,
      })),
      updatedAt: now,
    }));
  }
}

