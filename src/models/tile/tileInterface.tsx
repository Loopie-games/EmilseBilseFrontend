import { SimplePlayerDTO, SimpleUserDTO } from "../user/userInterface";

export interface TileNewFromUser {
    action: string
    aboutUserId: string
}

export interface UserTile extends idkTile  {
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

export interface TilePackSetting{
    tilePack: TilePack
    isActivated: boolean
}

export interface PackTile extends ByTile
{
    pack: TilePack
}

export interface PackTileDto{
    tileId: string
    packId: string
}

export interface idkTile {
    id: string
    action: string
    addedBy?: string
    tileType?: TileType;

}
export interface Tile{
    id: string
    action: string
}

export enum TileType {
    userTile, packTile
}
export interface BoardDTO{
    id: string
    gameId: string
}

export interface BoardTileDTO {
    id: string
    board: BoardDTO
    tile?: Tile
    aboutUser?: SimplePlayerDTO
    position: number
    ActivatedBy?: SimplePlayerDTO
}

export interface ByTile {
    id: string
    tile: idkTile
    tileType: TileType
}