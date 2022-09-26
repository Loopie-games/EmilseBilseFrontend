import { SimplePlayerDTO, SimpleUserDTO } from "../user/userInterface";

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface UserTile extends Tile  {
    id: string
    user: SimpleUserDTO
    addedByUser: SimpleUserDTO
    action: string
    addedBy: string
    tileType: number
}
export interface TilePack {
    id?: string
    name: string
    picUrl?: string
    isOwned?: boolean
    price?: number
}

export interface PackTile extends Tile
{
    id: string
    action: string
    pack: TilePack

}

export interface PackTileDto{
    tileId: string
    packId: string
}

export interface Tile {
    id: string
    action: string
    addedby?: string
    tileType?: TileType;

}

export enum TileType {
    userTile, packTile
}
export interface BoardDTO{
    id: string
    gameId: string
    userId: string
}

export interface BoardTileDTO {
    id: string
    board: BoardDTO
    tile: Tile
    aboutUser: SimplePlayerDTO
    position: number
    isActivated: boolean
}