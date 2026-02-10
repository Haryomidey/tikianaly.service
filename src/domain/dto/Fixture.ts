export type FixtureStatus = "scheduled" | "live" | "finished" | "abandoned" | "unknown";

export type FixtureDTO = {
  id: string;
  provider: "goalserve";
  providerMatchId: string;
  seriesId: string;
  matchId: string;
  scheduledAt: string | null;
  status: FixtureStatus;
  homeTeamId: string | null;
  awayTeamId: string | null;
  venue: string | null;
  updatedAt: Date;
};
