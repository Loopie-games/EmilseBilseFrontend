import { observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TopPlayer } from '../../../models/game/gameInterfaces';
import { useStore } from '../../../stores/store';
import Loader from '../../shared/loader/loader';
import './winnerscreen.scss'

const Winnerscreen = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        /**
         * @Description loads the active game from the params
         */
        const loadGame = async () => {
            setLoading(true);

            gameStore.game = await gameStore.getGame(params.id!)
            await gameStore.getTop3(gameStore.game!.id)
            setLoading(false);
        }
        loadGame()
    }, [])

    const { gameStore } = useStore();
    const navigate = useNavigate();
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'


    return (
        <>
            {loading ? <Loader /> :
                <div className="WinnerScreen_Container">
                    <div className='WinnerScreen_Title'>Game Over! 
                    <br/> <br/>Congratulations to the winners</div>
                    <div className='WinnerScreen_WinnerContainer'>
                        <div className='WinnerScreen_WinnerWrapper'>

                            {gameStore.topRanked.length >= 3 &&
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

                            }
                            <div className='WinnerScreen_WinnerComponent'>
                                <div className='WinnerScreen_WinnerImage'>
                                    <img src={defaultPic} alt="Winner" />
                                </div>
                                <div className='WinnerScreen_WinnerName'>{gameStore.topRanked[0].user.username}</div>
                                <div className='WinnerScreen_Pedestal First'>
                                    <div className='WinnerScreen_PedestalPlacement'>
                                        1.
                                    </div>
                                    <div className='WinnerScreen_PedestalTiles'>
                                        {gameStore.topRanked[0].turnedTiles}
                                    </div>
                                </div>
                            </div>
                            <div className='WinnerScreen_WinnerComponent'>
                                <div className='WinnerScreen_WinnerImage'>
                                    <img src={defaultPic} alt="Winner" />
                                </div>
                                <div className='WinnerScreen_WinnerName'>{gameStore.topRanked[1].user.username}</div>
                                <div className='WinnerScreen_Pedestal Second'>
                                    <div className='WinnerScreen_PedestalPlacement'>
                                        2.
                                    </div>
                                    <div className='WinnerScreen_PedestalTiles'>
                                        {gameStore.topRanked[1].turnedTiles}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='WinnerScreen_RestContainer'>
                        {gameStore.topRanked.length > 3 &&
                            <>
                                {gameStore.topRanked.slice(2).map((player: TopPlayer, index: number) => (
                                    <div className='WinnerScreen_RestComponentContainer'>

                                        <div className='WinnerScreen_RestComponentPlacement'>{index + 3}</div>
                                        <div className='WinnerScreen_RestComponentImageContainer'>
                                            <div className='WinnerScreen_RestComponentImage'>
                                                <img src={defaultPic} alt="pb" />
                                            </div>
                                        </div>
                                        <div className='WinnerScreen_RestComponentInfoContainer'>
                                            <div className='WinnerScreen_RestComponentName'>{player.user.username}</div>
                                            <div className='WinnerScreen_RestComponentTiles'>{player.turnedTiles}</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    <div className='WinnerScreen_ButtonContainer'>
                        <div className='WinnerScreen_Button' onClick={() => navigate('/')}>Back to home</div>
                    </div>
                </div>
            }
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