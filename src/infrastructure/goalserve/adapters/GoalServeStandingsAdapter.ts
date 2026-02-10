import { StandingsAdapter } from "../../../domain/ports/Adapters";
import { StandingDTO } from "../../../domain/dto/Standing";
import { stableId } from "../../../shared/utils/ids";

type GoalServeStandingsPayload = {
  standings?: {
    team?: Array<{
      id: string;
      pos?: string;
      p?: string;
      w?: string;
      l?: string;
      pts?: string;
      nrr?: string;
    }>;
  };
};

function toNumber(input?: string): number | null {
  if (!input) return null;
  const value = Number(input);
  return Number.isFinite(value) ? value : null;
}

export class GoalServeStandingsAdapter implements StandingsAdapter {
  fromStandingsPayload(seriesId: string, payload: unknown): StandingDTO[] {
    const data = payload as GoalServeStandingsPayload;
    const teams = data.standings?.team ?? [];
    const now = new Date();

    return teams.map((team) => ({
      id: stableId("standing", seriesId, team.id),
      provider: "goalserve",
      seriesId: stableId("series", seriesId),
      teamId: stableId("team", team.id),
      position: toNumber(team.pos) ?? 0,
      played: toNumber(team.p),
      won: toNumber(team.w),
      lost: toNumber(team.l),
      points: toNumber(team.pts),
      netRunRate: team.nrr ?? null,
      updatedAt: now,
    }));
  }
}

