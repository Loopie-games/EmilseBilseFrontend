import { SimplePlayerDTO, SimpleUserDTO } from "../user/userInterface";

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface UserTile extends ITile  {
    id: string
    user: SimpleUserDTO
    addedByUser: SimpleUserDTO
    action: string
    addedBy: string
    tileType: number
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
export interface BoardDTO{
    id: string
    gameId: string
    userId: string
}

export interface BoardTileDTO {
    id: string
    board: BoardDTO
    tile: ITile
    aboutUser: SimplePlayerDTO
    position: number
    isActivated: boolean
}