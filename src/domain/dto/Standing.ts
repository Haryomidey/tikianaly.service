export type StandingDTO = {
  id: string;
  provider: "goalserve";
  seriesId: string;
  teamId: string;
  position: number;
  played: number | null;
  won: number | null;
  lost: number | null;
  points: number | null;
  netRunRate: string | null;
  updatedAt: Date;
};

