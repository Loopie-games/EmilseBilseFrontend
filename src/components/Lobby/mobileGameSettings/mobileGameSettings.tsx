import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { TilePackSetting } from '../../../models/tile/tileInterface'
import { useStore } from '../../../stores/store'
import Icon from '../../shared/icon/Icon'
import './mobileGameSettings.scss'

interface GameSettingCom {
    tilePacks: TilePackSetting[]
    setTilePacks: (tps: TilePackSetting[]) => void
}

const MobileGameSettings = (GSCom: GameSettingCom) => {
    const { tileStore, gameModeStore } = useStore()
    const [isShown, setIsShown] = useState(false)
    const [gamemodeSettingsShown, setGamemodeSettingsShown] = useState(false);
    const [tilepackSettingsShown, setTilepackSettingsShown] = useState(false);
    const [testTilePacks, setTestTilePacks] = useState([
        {
            id: 1,
            name: 'test',
            isActivated: false,
        },
        {
            id: 2,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 3,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 4,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 5,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 6,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 7,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 8,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 9,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 10,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 11,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 12,
            name: 'test2',
            isActivated: false,
        },
        {
            id: 13,
            name: 'test2',
            isActivated: false,
        },
    ])

    const initTilePacks = async () => {
        GSCom.setTilePacks([])
        let tpList = await tileStore.getOwnedTilePack()
        let tpSetList: TilePackSetting[] = []

        tpList.forEach((tom) => {
            let tpSetting: TilePackSetting = { isActivated: false, tilePack: tom }
            tpSetList.push(tpSetting)
        })

        GSCom.setTilePacks(tpSetList)
    }

    const initGameModes = async () => {
        await gameModeStore.getAll();
    }

    useEffect(() => {
        initTilePacks();
        initGameModes();

    }, [])

    const handleSettingsClicked = () => {
        setIsShown(true)
        setTimeout(() => {
            let e = document.getElementById('t');
            let t = document.getElementById('closingContainer');
            e?.classList.add('GameSettingsM_Test');
            t?.classList.add('GameSettingsM_closingOverlayOpacity');
        }, 200);

    }

    const handleCancelClick = () => {
        let e = document.getElementById('t');
        let t = document.getElementById('closingContainer');
        e?.classList.remove('GameSettingsM_Test');
        t?.classList.remove('GameSettingsM_closingOverlayOpacity');
        setTimeout(() => {
            setIsShown(false)
        }, 200);
    }

    const toggleTilepack = (id: string) => {
        const newTilePacks = GSCom.tilePacks.map(tilePack => {
            if (tilePack.tilePack.id === id) {
                tilePack.isActivated = !tilePack.isActivated;
            }
            return tilePack;
        })
        GSCom.setTilePacks(newTilePacks);
    }

    const toggleGamemode = (id: string) => {
        gameModeStore.toggleGameMode(id);
    }

    const handleGamemodeSettingsClick = () => {
        setGamemodeSettingsShown(!gamemodeSettingsShown);
        setTilepackSettingsShown(false);
    }

    const handleTilepackSettingsClick = () => {
        setTilepackSettingsShown(!tilepackSettingsShown);
        setGamemodeSettingsShown(false);
    }
    return (
        <>
            <div className='GameSettingsM_OpenIconContainer' onClick={handleSettingsClicked}>
                <Icon name="settings" />
            </div>
            {
                isShown &&
                <>
                    <div id='t' className='GameSettingsM_Container'>
                        <div className='GameSettingsM_CloseContainer' onClick={handleCancelClick}>
                            <Icon name="cross" />
                        </div>
                        <div className={`GameSettingsM_Wrapper`}>
                            <div className='GameSettingsM_Header'>
                                Game Settings
                            </div>
                            <div className={`GameSettingsM_ContentWrapper`}>
                                {/**
                                 * GAMEMODE SETTINGS
                                */}
                                <div className={`GameSettingsM_ContentTitleContainer `} onClick={handleGamemodeSettingsClick}>
                                    <div className='GameSettingsM_ContentIcon'>
                                        <Icon name="gamemodes" />
                                    </div>
                                    <div className='GameSettingsM_ContentTitle'>
                                        Gamemodes
                                    </div>
                                </div>
                                <div className={`GameSettingsM_ContentContainer ${gamemodeSettingsShown ? 'TilePackSettingsShown' : ''}`}>
                                    {
                                        <>
                                            {gameModeStore.gameModes.map((gamemodeSetting) => {
                                                return (
                                                    <div className={`GameSettings_TilePackComponentContainer ${gamemodeSetting.isActivated ? 'GameSettings_TilepackActivated' : ''}`} key={gamemodeSetting.gameMode.id} onClick={() => { toggleGamemode(gamemodeSetting.gameMode.id!) }}>
                                                        <div className='GameSettings_TilePackText'>{gamemodeSetting.gameMode.name}</div>
                                                        {gamemodeSetting.isActivated &&
                                                            <div className='GameSettings_TilePackIcon'>
                                                                <Icon name="check_circle" />
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </>
                                    }
                                </div>
                                {/**
                                 * TILEPACK SETTINGS
                                */}
                                <div className={`GameSettingsM_ContentTitleContainer `} onClick={handleTilepackSettingsClick}>
                                    <div className='GameSettingsM_ContentIcon'>
                                        <Icon name="tilepack_creator" />
                                    </div>
                                    <div className='GameSettingsM_ContentTitle'>
                                        Tile packs
                                    </div>
                                </div>
                                <div className={`GameSettingsM_ContentContainer ${tilepackSettingsShown ? 'TilePackSettingsShown' : ''}`}>
                                    {
                                        <>
                                            {GSCom.tilePacks.map((tilePack) => {
                                                return (
                                                    <div className={`GameSettings_TilePackComponentContainer ${tilePack.isActivated ? 'GameSettings_TilepackActivated' : ''}`} key={tilePack.tilePack.id} onClick={() => { toggleTilepack(tilePack.tilePack.id!) }}>
                                                        <div className='GameSettings_TilePackText'>{tilePack.tilePack.name}</div>
                                                        {tilePack.isActivated &&
                                                            <div className='GameSettings_TilePackIcon'>
                                                                <Icon name="check_circle" />
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                    <div id='closingContainer' className='GameSettingsM_ClosingContainer'></div>
                </>
            }
        </>
    )
}

export default observer(MobileGameSettings)