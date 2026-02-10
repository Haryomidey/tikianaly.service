import { Scheduler, JobConfig } from "./Scheduler";
import { SeriesIngestionService } from "../services/SeriesIngestionService";
import { FixturesIngestionService } from "../services/FixturesIngestionService";
import { LiveMatchIngestionService } from "../services/LiveMatchIngestionService";
import { SquadIngestionService } from "../services/SquadIngestionService";
import { PlayerProfileIngestionService } from "../services/PlayerProfileIngestionService";
import { StandingsIngestionService } from "../services/StandingsIngestionService";

export type JobFactory = {
  series: SeriesIngestionService;
  fixtures: (seriesId: string) => FixturesIngestionService;
  live: LiveMatchIngestionService;
  squads: (seriesId: string) => SquadIngestionService;
  playerProfile: (profileId: string) => PlayerProfileIngestionService;
  standings: (seriesId: string) => StandingsIngestionService;
};

export function registerJobs(
  scheduler: Scheduler,
  factory: JobFactory,
  seriesIds: string[],
  profileIds: string[],
): void {
  const jobs: JobConfig[] = [
    { name: "series", intervalMs: 6 * 60 * 60 * 1000, service: factory.series },
    { name: "live", intervalMs: 15 * 1000, service: factory.live },
  ];

  seriesIds.forEach((seriesId) => {
    jobs.push({
      name: `fixtures:${seriesId}`,
      intervalMs: 30 * 60 * 1000,
      service: factory.fixtures(seriesId),
    });
    jobs.push({
      name: `squads:${seriesId}`,
      intervalMs: 330 * 60 * 1000,
      service: factory.squads(seriesId),
    });
    jobs.push({
      name: `standings:${seriesId}`,
      intervalMs: 15 * 60 * 1000,
      service: factory.standings(seriesId),
    });
  });

  profileIds.forEach((profileId) => {
    jobs.push({
      name: `profile:${profileId}`,
      intervalMs: 30 * 60 * 1000,
      service: factory.playerProfile(profileId),
    });
  });

  jobs.forEach((job) => scheduler.register(job));
}

