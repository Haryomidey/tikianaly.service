import { LiveScoreAdapter } from "../../../domain/ports/Adapters";
import { LiveMatchSnapshotDTO } from "../../../domain/dto/Match";
import { stableId } from "../../../shared/utils/ids";

type GoalServeLiveScorePayload = {
  livescore?: {
    match?: Array<{
      id: string;
      series_id?: string;
      status?: string;
      home_team_id?: string;
      away_team_id?: string;
      batting?: { r?: string; w?: string; o?: string };
      bowling?: { r?: string; w?: string; o?: string };
    }>;
  };
};

function parseNumber(input?: string): number | null {
  if (!input) return null;
  const value = Number(input);
  return Number.isFinite(value) ? value : null;
}

export class GoalServeLiveScoreAdapter implements LiveScoreAdapter {
  fromLiveScorePayload(payload: unknown): LiveMatchSnapshotDTO[] {
    const data = payload as GoalServeLiveScorePayload;
    const matches = data.livescore?.match ?? [];
    const now = new Date();

    return matches.map((match) => ({
      id: stableId("live_match", match.id, now.toISOString()),
      provider: "goalserve",
      providerMatchId: match.id,
      matchId: stableId("match", match.id),
      seriesId: match.series_id ? stableId("series", match.series_id) : null,
      status: match.status ?? null,
      homeTeamId: match.home_team_id ? stableId("team", match.home_team_id) : null,
      awayTeamId: match.away_team_id ? stableId("team", match.away_team_id) : null,
      batting: match.batting
        ? { runs: parseNumber(match.batting.r), wickets: parseNumber(match.batting.w), overs: match.batting.o ?? null }
        : null,
      bowling: match.bowling
        ? { runs: parseNumber(match.bowling.r), wickets: parseNumber(match.bowling.w), overs: match.bowling.o ?? null }
        : null,
      updatedAt: now,
      timestamp: now,
    }));
  }
}

