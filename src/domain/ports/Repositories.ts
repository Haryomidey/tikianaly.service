import { FixtureDTO } from "../dto/Fixture";
import { LiveMatchSnapshotDTO } from "../dto/Match";
import { PlayerDTO } from "../dto/Player";
import { SeriesDTO } from "../dto/Series";
import { StandingDTO } from "../dto/Standing";
import { TeamDTO } from "../dto/Team";

export interface SeriesRepository {
  upsertMany(series: SeriesDTO[]): Promise<void>;
}

export interface FixturesRepository {
  upsertMany(fixtures: FixtureDTO[]): Promise<void>;
}

export interface LiveMatchRepository {
  upsert(snapshot: LiveMatchSnapshotDTO): Promise<void>;
}

export interface TeamsRepository {
  upsertMany(teams: TeamDTO[]): Promise<void>;
}

export interface PlayersRepository {
  upsert(player: PlayerDTO): Promise<void>;
}

export interface StandingsRepository {
  upsertMany(standings: StandingDTO[]): Promise<void>;
}

