export interface CricketFeedClient {
  getTours(): Promise<unknown>;
  getSeriesFixtures(seriesId: string): Promise<unknown>;
  getLiveScore(): Promise<unknown>;
  getSeriesSquads(seriesId: string): Promise<unknown>;
  getPlayerProfile(profileId: string): Promise<unknown>;
  getSeriesStandings(seriesId: string): Promise<unknown>;
}

