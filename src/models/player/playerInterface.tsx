import { Lobby } from "../game/gameInterfaces";
import { SimpleUserDTO } from "../user/userInterface";

export interface pendingPlayerDto {
    id: string
    isHost: boolean
    lobby: Lobby
    user: SimpleUserDTO
}
