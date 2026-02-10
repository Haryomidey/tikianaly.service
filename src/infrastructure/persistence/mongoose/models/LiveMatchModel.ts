import mongoose from "mongoose";

const LiveScoreSchema = new mongoose.Schema(
  {
    runs: Number,
    wickets: Number,
    overs: String,
  },
  { _id: false },
);

const LiveMatchSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    providerMatchId: { type: String, required: true },
    matchId: { type: String, required: true },
    seriesId: { type: String },
    status: { type: String },
    homeTeamId: { type: String },
    awayTeamId: { type: String },
    batting: { type: LiveScoreSchema },
    bowling: { type: LiveScoreSchema },
    updatedAt: { type: Date, required: true },
    timestamp: { type: Date, required: true },
  },
  { collection: "live_matches" },
);

LiveMatchSchema.index({ matchId: 1, timestamp: 1 });
LiveMatchSchema.index({ providerMatchId: 1 });

export const LiveMatchModel = mongoose.model("LiveMatch", LiveMatchSchema);

