import { SimpleUserDTO } from "../user/userInterface";

export interface TileForUser {
    id: string
    userNickname: string
    action: string
    addedByNickname: string
}

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface TileDTO {
    id: string
    user: SimpleUserDTO
    action: string
    addedBy: SimpleUserDTO

}

export interface BoardTileDTO {
    id: string
    boardId: string
    tile: TileDTO
    position: number
    isActivated: boolean
}