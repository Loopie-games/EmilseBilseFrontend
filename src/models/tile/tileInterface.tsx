import { SimpleUserDTO } from "../user/userInterface";

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface UserTile extends ITile  {
    id: string
    user: SimpleUserDTO
    action: string
    addedBy: SimpleUserDTO

}
export interface TilePack {
    id: string
    name: string
}

export interface PackTile extends ITile
{
    id: string
    action: string
    pack: TilePack

}
export interface ITile {
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
    tile: ITile
    aboutUser: SimpleUserDTO
    position: number
    isActivated: boolean
}