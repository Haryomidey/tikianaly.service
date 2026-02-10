import mongoose from "mongoose";

const SeriesSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    name: { type: String, required: true },
    season: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    updatedAt: { type: Date, required: true },
  },
  { collection: "series" },
);

SeriesSchema.index({ providerId: 1 }, { unique: true });

export const SeriesModel = mongoose.model("Series", SeriesSchema);

