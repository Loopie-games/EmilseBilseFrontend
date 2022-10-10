import {SimpleUserDTO, UserDTO} from "../user/userInterface";

export interface Lobby {
    id: string
    host: string
    pin: string
}

export interface CreateGameDto{
    lobbyId:string
    tpIds:(string | undefined)[]
}

export interface GameDTO {
    id: string
    host: SimpleUserDTO
    winner?: SimpleUserDTO
    state: State
}

export enum State {
    Ongoing, Paused, Ended

}

export interface CloseLobbyDto {
    lobbyID: string
    hostID: string
}

export interface LeaveLobbyDto {
    lobbyID: string
    userID: string
}

export interface StartGameDto {
    lobbyId: string
    userId: string
}

export interface TopPlayer {
    id: string
    gameId: string
    user: SimpleUserDTO
    turnedTiles: number
}

export interface Settings {

}