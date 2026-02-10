import { FixturesAdapter } from "../../../domain/ports/Adapters";
import { FixtureDTO, FixtureStatus } from "../../../domain/dto/Fixture";
import { stableId } from "../../../shared/utils/ids";

type GoalServeFixturesPayload = {
  fixtures?: {
    match?: Array<{
      id: string;
      date?: string;
      time?: string;
      status?: string;
      venue?: string;
      home_team_id?: string;
      away_team_id?: string;
    }>;
  };
};

function normalizeStatus(status?: string): FixtureStatus {
  if (!status) return "unknown";
  const key = status.toLowerCase();
  if (key.includes("scheduled")) return "scheduled";
  if (key.includes("live") || key.includes("in progress")) return "live";
  if (key.includes("finished") || key.includes("result")) return "finished";
  if (key.includes("abandon") || key.includes("no result")) return "abandoned";
  return "unknown";
}

export class GoalServeFixturesAdapter implements FixturesAdapter {
  fromFixturesPayload(seriesId: string, payload: unknown): FixtureDTO[] {
    const data = payload as GoalServeFixturesPayload;
    const matches = data.fixtures?.match ?? [];
    const now = new Date();

    return matches.map((match) => {
      const scheduledAt = match.date && match.time ? `${match.date} ${match.time}` : match.date ?? null;
      return {
        id: stableId("fixture", match.id),
        provider: "goalserve",
        providerMatchId: match.id,
        seriesId: stableId("series", seriesId),
        matchId: stableId("match", match.id),
        scheduledAt,
        status: normalizeStatus(match.status),
        homeTeamId: match.home_team_id ? stableId("team", match.home_team_id) : null,
        awayTeamId: match.away_team_id ? stableId("team", match.away_team_id) : null,
        venue: match.venue ?? null,
        updatedAt: now,
      };
    });
  }
}
