import mongoose from "mongoose";

const StandingSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    provider: { type: String, required: true },
    seriesId: { type: String, required: true },
    teamId: { type: String, required: true },
    position: { type: Number, required: true },
    played: { type: Number },
    won: { type: Number },
    lost: { type: Number },
    points: { type: Number },
    netRunRate: { type: String },
    updatedAt: { type: Date, required: true },
  },
  { collection: "standings" },
);

StandingSchema.index({ seriesId: 1, teamId: 1 }, { unique: true });

export const StandingModel = mongoose.model("Standing", StandingSchema);