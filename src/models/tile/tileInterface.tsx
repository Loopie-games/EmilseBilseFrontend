import { SimpleUserDTO } from "../user/userInterface";

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface UserTile {
    id: string
    user: SimpleUserDTO
    action: string
    addedBy: SimpleUserDTO

}

export interface Tile {
    id: string
    action: string

}
export interface Board{
    id: string
    gameId: string
    userId: string
}

export interface BoardTileDTO {
    id: string
    board: Board
    tile: Tile
    aboutUser: SimpleUserDTO
    position: number
    isActivated: boolean
}