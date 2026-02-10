import { PlayersRepository as PlayersRepositoryPort } from "../../../../domain/ports/Repositories";
import { PlayerDTO } from "../../../../domain/dto/Player";
import { PlayerModel } from "../models/PlayerModel";

export class PlayersRepository implements PlayersRepositoryPort {
  async upsert(player: PlayerDTO): Promise<void> {
    await PlayerModel.updateOne(
      { providerPlayerId: player.providerPlayerId },
      { $set: player },
      { upsert: true },
    );
  }
}

