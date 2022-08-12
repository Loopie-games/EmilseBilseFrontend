import { TileForUser } from "../tile/tileInterface";
import { UserDTO } from "../user/userInterface";

export interface Lobby {
    host: UserDTO
    inProgress: boolean
    settings: Settings
    tiles: TileForUser[]
    pin: string
}

export interface GameRoom {
    boards: Board[]
    status: boolean
    lobby: Lobby
}

export interface Board {
    owner: UserDTO
    tiles: GameTile[]
}

export interface GameTile {
    tile: TileForUser
    completed: boolean
}

export interface Settings {

}