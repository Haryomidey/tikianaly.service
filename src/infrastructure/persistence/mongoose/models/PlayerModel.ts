import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    providerPlayerId: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String },
    battingStyle: { type: String },
    bowlingStyle: { type: String },
    role: { type: String },
    updatedAt: { type: Date, required: true },
  },
  { collection: "players" },
);

PlayerSchema.index({ id: 1 }, { unique: true });
PlayerSchema.index({ providerPlayerId: 1 });

export const PlayerModel = mongoose.model("Player", PlayerSchema);
