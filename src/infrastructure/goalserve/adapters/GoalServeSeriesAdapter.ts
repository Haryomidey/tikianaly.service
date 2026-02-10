import { SeriesAdapter } from "../../../domain/ports/Adapters";
import { SeriesDTO } from "../../../domain/dto/Series";
import { stableId } from "../../../shared/utils/ids";

type GoalServeToursPayload = {
  tours?: {
    tour?: Array<{
      id: string;
      name: string;
      season?: string;
      start_date?: string;
      end_date?: string;
    }>;
  };
};

export class GoalServeSeriesAdapter implements SeriesAdapter {
  fromToursPayload(payload: unknown): SeriesDTO[] {
    const data = payload as GoalServeToursPayload;
    const tours = data.tours?.tour ?? [];

    return tours.map((tour) => ({
      id: stableId("series", tour.id),
      provider: "goalserve",
      providerId: tour.id,
      name: tour.name,
      season: tour.season ?? null,
      startDate: tour.start_date ?? null,
      endDate: tour.end_date ?? null,
      updatedAt: new Date(),
    }));
  }
}

