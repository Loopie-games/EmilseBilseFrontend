import {SimpleUserDTO, UserDTO} from "../user/userInterface";
import Board from "../../components/gameBoard/board/board";
import {BoardDTO} from "../tile/tileInterface";

export interface Lobby {
    id: string
    host: string
    pin: string
}

export interface CreateGameDto{
    lobbyId:string
    name?: string
    tpIds:(string | undefined)[]
}

export interface GameNameChangeDto{
    gameId: string
    name?: string
}

export interface GameDTO {
    id: string
    name?: string
    host: SimpleUserDTO
    winnerId?: string
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