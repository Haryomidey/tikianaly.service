export type LiveScore = {
  runs: number | null;
  wickets: number | null;
  overs: string | null;
};

export type LiveMatchSnapshotDTO = {
  id: string;
  provider: "goalserve";
  providerMatchId: string;
  matchId: string;
  seriesId: string | null;
  status: string | null;
  homeTeamId: string | null;
  awayTeamId: string | null;
  batting: LiveScore | null;
  bowling: LiveScore | null;
  updatedAt: Date;
  timestamp: Date;
};

