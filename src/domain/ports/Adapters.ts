import { FixtureDTO } from "../dto/Fixture";
import { LiveMatchSnapshotDTO } from "../dto/Match";
import { PlayerDTO } from "../dto/Player";
import { SeriesDTO } from "../dto/Series";
import { StandingDTO } from "../dto/Standing";
import { TeamDTO } from "../dto/Team";

export interface SeriesAdapter {
  fromToursPayload(payload: unknown): SeriesDTO[];
}

export interface FixturesAdapter {
  fromFixturesPayload(seriesId: string, payload: unknown): FixtureDTO[];
}

export interface LiveScoreAdapter {
  fromLiveScorePayload(payload: unknown): LiveMatchSnapshotDTO[];
}

export interface SquadsAdapter {
  fromSquadsPayload(seriesId: string, payload: unknown): TeamDTO[];
}

export interface PlayerProfileAdapter {
  fromProfilePayload(payload: unknown): PlayerDTO;
}

export interface StandingsAdapter {
  fromStandingsPayload(seriesId: string, payload: unknown): StandingDTO[];
}

