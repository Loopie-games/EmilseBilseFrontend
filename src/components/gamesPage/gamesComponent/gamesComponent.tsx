import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import Icon from '../../shared/icon/Icon'
import './gamesComponent.scss'
import { GameDTO, State } from "../../../models/game/gameInterfaces";

export interface gamesComponentProps {
    game: GameDTO,
    onDelete: any,
}


const GamesComponent = ({ game, onDelete }: gamesComponentProps) => {
    const params = useParams();
    const navigate = useNavigate();
    const { userStore, gameStore, popupStore } = useStore();
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    useEffect(() => {
        setIsLoggedInUser(userStore.user?.id === params.id);
        console.log(State[game.state]);

    }, [userStore, params.id])

    const deleteGame = async () => {
        try {
            onDelete();
        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }

    const handleClickGotoGame = () => {
        popupStore.showConfirmation('Are you sure',
            `Are you sure you want to go to ${game.name}?`, () => {
                navigate(`/game/${game.id}`);
            },
            () => {
                popupStore.hide();
            });
    }

    return (
        <div className='GameComponent_Container'>
            <div className='GameComponent_TileInfoContainer'>
                <div className='GameComponent_TileInfo Title'>{game.name}</div>
                <div className='GameComponent_TileInfo Status'>Status: {State[game.state]}</div>
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