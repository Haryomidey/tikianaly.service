export type SeriesDTO = {
  id: string;
  provider: "goalserve";
  providerId: string;
  name: string;
  season: string | null;
  startDate: string | null;
  endDate: string | null;
  updatedAt: Date;
};

