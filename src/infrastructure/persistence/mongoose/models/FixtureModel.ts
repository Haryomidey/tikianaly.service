import mongoose from "mongoose";

const FixtureSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    providerMatchId: { type: String, required: true },
    seriesId: { type: String, required: true },
    matchId: { type: String, required: true },
    scheduledAt: { type: String },
    status: { type: String },
    homeTeamId: { type: String },
    awayTeamId: { type: String },
    venue: { type: String },
    updatedAt: { type: Date, required: true },
  },
  { collection: "fixtures" },
);

FixtureSchema.index({ seriesId: 1, matchId: 1 }, { unique: true });

export const FixtureModel = mongoose.model("Fixture", FixtureSchema);

