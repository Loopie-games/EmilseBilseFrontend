import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useStore } from '../../../stores/store'
import Icon from '../../shared/icon/Icon'
import './mobileGameSettings.scss'

const MobileGameSettings = () => {
    const { lobbyStore } = useStore()
    const [isShown, setIsShown] = useState(false)
    const [tilepackSettingsShown, setTilepackSettingsShown] = useState(false)
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

    const handleTilepackSettingsClick = () => {
        setTilepackSettingsShown(!tilepackSettingsShown)
    }

    const handleSettingsClicked = () => {
        setIsShown(true)
        setTimeout(() => {
            let e = document.getElementById('t');
            let t = document.getElementById('closingContainer');
            console.log(t);
            e?.classList.add('GameSettingsM_Test');
            t?.classList.add('GameSettingsM_closingOverlayOpacity');
        }, 200);

    }

    const handleCancelClick = () => {
        let e = document.getElementById('t');
        let t = document.getElementById('closingContainer');
        console.log(e);
        e?.classList.remove('GameSettingsM_Test');
        t?.classList.remove('GameSettingsM_closingOverlayOpacity');
        setTimeout(() => {
            setIsShown(false)
        }, 200);
    }

    const handleSaveClick = () => {
        let e = document.getElementById('t');
        let t = document.getElementById('closingContainer');
        console.log(e);
        e?.classList.remove('GameSettingsM_Test');
        t?.classList.remove('GameSettingsM_closingOverlayOpacity');
        setTimeout(() => {
            setIsShown(false)
        }, 200);
    }

    const toggleTilepack = (id: number) => {
        const newTilePacks = testTilePacks.map((tilePack) => {
            if (tilePack.id === id) {
                tilePack.isActivated = !tilePack.isActivated
            }
            return tilePack
        })
        setTestTilePacks(newTilePacks)
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
                                <div className={`GameSettingsM_ContentTitleContainer`} onClick={handleTilepackSettingsClick}>
                                    <div className='GameSettingsM_ContentIcon'>
                                        <Icon name="settings" />
                                    </div>
                                    <div className='GameSettingsM_ContentTitle'>
                                        Tile packs
                                    </div>
                                </div>
                                <div className={`GameSettingsM_ContentContainer ${tilepackSettingsShown ? 'TilePackSettingsShown' : ''}`}>
                                    {
                                        testTilePacks.map((tilePack) => (
                                            <div className={`GameSettingsM_Content ${tilePack.isActivated ? 'GameSettingsM_TilepackActivated' : ''}`} key={tilePack.id} onClick={() => toggleTilepack(tilePack.id)}>
                                                <div className='GameSettingsM_ContentName'>
                                                    {tilePack.name}
                                                </div>
                                                {tilePack.isActivated &&
                                                    <div className='GameSettingsM_ContentIcon'>
                                                        <Icon name="check_circle" />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='GameSettingsM_ButtonContainer'>
                                <div className='GameSettingsM_Button' onClick={handleCancelClick}>
                                    Cancel
                                </div>
                                <div className='GameSettingsM_Button' onClick={handleSaveClick}>
                                    Save
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