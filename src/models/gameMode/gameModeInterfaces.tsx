export interface GameMode {
    id: string
    name: string
}

export interface GameModeSetting{
    gameMode: GameMode
    isActivated: boolean
}