export type TeamDTO = {
  id: string;
  provider: "goalserve";
  providerTeamId: string;
  name: string;
  shortName: string | null;
  seriesId: string | null;
  players: Array<{
    playerId: string;
    role: string | null;
  }>;
  updatedAt: Date;
};

