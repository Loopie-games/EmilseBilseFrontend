import {PackTile} from "../tile/tileInterface";

export interface newTilepackDTO {
    icon: string
    name: string
    price: number
    discount: number
    tiles: PackTile[]
}