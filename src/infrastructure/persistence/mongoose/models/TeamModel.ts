import mongoose from "mongoose";

const PlayerRefSchema = new mongoose.Schema(
  {
    playerId: { type: String, required: true },
    role: { type: String },
  },
  { _id: false },
);

const TeamSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    providerTeamId: { type: String, required: true },
    name: { type: String, required: true },
    shortName: { type: String },
    seriesId: { type: String },
    players: { type: [PlayerRefSchema], default: [] },
    updatedAt: { type: Date, required: true },
  },
  { collection: "teams" },
);

TeamSchema.index({ providerTeamId: 1 }, { unique: true });

export const TeamModel = mongoose.model("Team", TeamSchema);

