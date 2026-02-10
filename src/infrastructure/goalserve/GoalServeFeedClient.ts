import { CricketFeedClient } from "../../domain/ports/CricketFeedClient";
import { HttpClient } from "../../domain/ports/HttpClient";

export class GoalServeFeedClient implements CricketFeedClient {
  constructor(private readonly http: HttpClient) {}

  getTours(): Promise<unknown> {
    return this.http.get({ path: "/cricketfixtures/tours" });
  }

  getSeriesFixtures(seriesId: string): Promise<unknown> {
    return this.http.get({ path: `/cricketfixtures/intl/${seriesId}` });
  }

  getLiveScore(): Promise<unknown> {
    return this.http.get({ path: "/cricket/livescore" });
  }

  getSeriesSquads(seriesId: string): Promise<unknown> {
    return this.http.get({ path: `/cricketfixtures/intl/${seriesId}_squads` });
  }

  getPlayerProfile(profileId: string): Promise<unknown> {
    return this.http.get({ path: "/cricket/profile", query: { id: profileId } });
  }

  getSeriesStandings(seriesId: string): Promise<unknown> {
    return this.http.get({ path: `/cricketfixtures/intl/${seriesId}_table` });
  }
}

