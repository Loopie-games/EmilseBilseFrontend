import {SimpleUserDTO, UserDTO } from "../user/userInterface";

export interface Lobby{
    id: string
    host: string
    pin: string
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

export interface Settings {

}