import { SimpleUserDTO } from "../user/userInterface";

export interface TileForUser{
    id: string
    userNickname: string
    action: string
    addedByNickname: string
}

export interface TileNewFromUser {
    action: string
    aboutUsername: string
}

export interface TileDto {
    id: string
    user: SimpleUserDTO
    action: string
    addedBy: SimpleUserDTO

}

export interface BoardTileDTO {
    id: string
    boardId: string
    tile: TileDto
    position: number
    isActivated: boolean
}