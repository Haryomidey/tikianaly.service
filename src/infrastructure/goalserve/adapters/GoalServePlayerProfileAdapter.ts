import { PlayerProfileAdapter } from "../../../domain/ports/Adapters";
import { PlayerDTO } from "../../../domain/dto/Player";
import { stableId } from "../../../shared/utils/ids";

type GoalServePlayerProfilePayload = {
  profile?: {
    player?: {
      id: string;
      name: string;
      country?: string;
      batting_style?: string;
      bowling_style?: string;
      role?: string;
    };
  };
};

export class GoalServePlayerProfileAdapter implements PlayerProfileAdapter {
  fromProfilePayload(payload: unknown): PlayerDTO {
    const data = payload as GoalServePlayerProfilePayload;
    const player = data.profile?.player;
    if (!player) {
      throw new Error("Missing player profile");
    }

    return {
      id: stableId("player", player.id),
      provider: "goalserve",
      providerPlayerId: player.id,
      name: player.name,
      country: player.country ?? null,
      battingStyle: player.batting_style ?? null,
      bowlingStyle: player.bowling_style ?? null,
      role: player.role ?? null,
      updatedAt: new Date(),
    };
  }
}

