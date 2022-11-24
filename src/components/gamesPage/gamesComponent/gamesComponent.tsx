import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import Icon from '../../shared/icon/Icon'
import './gamesComponent.scss'

export interface gamesComponentProps {
    game: any,
    onDelete: any,
}


const GamesComponent = ({ game, onDelete }: gamesComponentProps) => {
    const params = useParams();
    const navigate = useNavigate();
    const { userStore, gamesStore, popupStore } = useStore();
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    useEffect(() => {
        setIsLoggedInUser(userStore.user?.id === params.id);

    }, [userStore, params.id])

    const deleteGame = async () => {
        try {
            //await tileStore.deleteTile(tile.id);
            onDelete();
            

        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }

    const handleClickGotoGame = () => {
        popupStore.showConfirmation('Are you sure',
            `Are you sure you want to go to ${game.title}?`, () => {
                navigate(`/game/${game.id}`);
            },
            () => {
                popupStore.hide();
            });
    }

    return (
        <div className='GameComponent_Container'>
            <div className='GameComponent_TileInfoContainer'>
                <div className='GameComponent_TileInfo Title'>{game.title}</div>
                <div className='GameComponent_TileInfo Status'>Status: {game.status}</div>
            </div>

            {isLoggedInUser ?
                <>
                    <div className='GameComponent_GotoButtonContainer'>
                        <div className='GameComponent_GotoButton' onClick={handleClickGotoGame}>
                            <p className='GameComponent_Goto'>Go To</p>
                        </div>
                    </div>
                    <div className='GameComponent_TileInfoIcon' onClick={deleteGame}><Icon name="cross" /></div>
                </>
                : null}
        </div>
    )
}

export default observer(GamesComponent)