export type PlayerDTO = {
  id: string;
  provider: "goalserve";
  providerPlayerId: string;
  name: string;
  country: string | null;
  battingStyle: string | null;
  bowlingStyle: string | null;
  role: string | null;
  updatedAt: Date;
};

