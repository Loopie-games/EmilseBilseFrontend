import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import './winnerscreen.scss'

const Winnerscreen = () => {
    const { gameStore } = useStore();
    const navigate = useNavigate();
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'


    return (
        <>
            <div className="WinnerScreen_Container">
                <div className='WinnerScreen_Title'>Title</div>
                <div className='WinnerScreen_WinnerContainer'>
                    <div className='WinnerScreen_WinnerWrapper'>
                        <div className='WinnerScreen_WinnerComponent'>
                            <div className='WinnerScreen_WinnerImage'>
                                <img src={defaultPic} alt="Winner" />
                            </div>
                            <div className='WinnerScreen_WinnerName'>Hovedskov</div>
                            <div className='WinnerScreen_Pedestal Third'>
                                <div className='WinnerScreen_PedestalPlacement'>
                                    3.
                                </div>
                                <div className='WinnerScreen_PedestalTiles'>
                                    22 Tiles
                                </div>
                            </div>
                        </div>
                        <div className='WinnerScreen_WinnerComponent'>
                            <div className='WinnerScreen_WinnerImage'>
                                <img src={defaultPic} alt="Winner" />
                            </div>
                            <div className='WinnerScreen_WinnerName'>Hovedskov</div>
                            <div className='WinnerScreen_Pedestal First'>
                                <div className='WinnerScreen_PedestalPlacement'>
                                    1.
                                </div>
                                <div className='WinnerScreen_PedestalTiles'>
                                    24 Tiles
                                </div>
                            </div>
                        </div>
                        <div className='WinnerScreen_WinnerComponent'>
                            <div className='WinnerScreen_WinnerImage'>
                                <img src={defaultPic} alt="Winner" />
                            </div>
                            <div className='WinnerScreen_WinnerName'>Hovedskov</div>
                            <div className='WinnerScreen_Pedestal Second'>
                                <div className='WinnerScreen_PedestalPlacement'>
                                    2.
                                </div>
                                <div className='WinnerScreen_PedestalTiles'>
                                    23 Tiles
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='WinnerScreen_RestContainer'>
                    <div className='WinnerScreen_RestComponentContainer'>

                        <div className='WinnerScreen_RestComponentPlacement'>4.</div>
                        <div className='WinnerScreen_RestComponentImageContainer'>
                            <div className='WinnerScreen_RestComponentImage'>
                                <img src={defaultPic} alt="pb" />
                            </div>
                        </div>
                        <div className='WinnerScreen_RestComponentInfoContainer'>
                            <div className='WinnerScreen_RestComponentName'>Name</div>
                            <div className='WinnerScreen_RestComponentTiles'>Tiles</div>
                        </div>
                    </div>
                </div>
                <div className='WinnerScreen_ButtonContainer'>
                    <div className='WinnerScreen_Button' onClick={() => navigate('/')}>Back to home</div>
                </div>
            </div>
        </>
    )
}

const WinnerscreenMobile = () => {
    const { gameStore } = useStore();

    return (
        <>
        </>
    )
}


export default observer(Winnerscreen)