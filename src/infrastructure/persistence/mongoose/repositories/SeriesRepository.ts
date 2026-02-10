import { SeriesRepository as SeriesRepositoryPort } from "../../../../domain/ports/Repositories";
import { SeriesDTO } from "../../../../domain/dto/Series";
import { SeriesModel } from "../models/SeriesModel";

export class SeriesRepository implements SeriesRepositoryPort {
  async upsertMany(series: SeriesDTO[]): Promise<void> {
    if (series.length === 0) return;
    const ops = series.map((item) => ({
      updateOne: {
        filter: { providerId: item.providerId },
        update: { $set: item },
        upsert: true,
      },
    }));
    await SeriesModel.bulkWrite(ops, { ordered: false });
  }
}

