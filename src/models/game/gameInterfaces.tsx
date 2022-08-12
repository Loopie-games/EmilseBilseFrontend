import { TileForUser } from "../tile/tileInterface";
import { UserDTO } from "../user/userInterface";

export interface Lobby {
    id: string
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

export interface CloseLobbyDto{
    lobbyID: string
    hostID: string
}

export interface LeaveLobbyDto{
    lobbyID: string
    userID: string
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