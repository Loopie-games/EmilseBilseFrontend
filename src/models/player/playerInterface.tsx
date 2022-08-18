import { SimpleUserDTO } from "../user/userInterface";

export interface pendingPlayerDto {

    id: string
    lobbyId: string
    player: SimpleUserDTO
}