import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GamesComponent from '../../components/gamesPage/gamesComponent/gamesComponent';
import Icon from '../../components/shared/icon/Icon';
import Loader from '../../components/shared/loader/loader';
import UserCreatedTile from '../../components/tilesPages/userCreatedTile';
import { UserTile } from '../../models/tile/tileInterface';
import { useStore } from '../../stores/store';
import './profileGamesPage.scss'
import { GameDTO } from "../../models/game/gameInterfaces";

const ProfileGamesPage = () => {
    const { gameStore, popupStore } = useStore();
    const params = useParams();
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
        getAllGames()
    }, [search, params.id])


    const getAllGames = async () => {
        try {
            let games = await gameStore.getSaved();
            const debouncedSearch = setTimeout(async () => {
                setFilteredList(games.filter(((t: GameDTO) => t.name?.toLowerCase().includes(search.toLowerCase()) || t.state.toString().toLowerCase().includes(search.toLowerCase())))!);
            }, 500);
            return () => {
                clearTimeout(debouncedSearch);
            }
        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }

    const handleClearSearch = async () => {
        let games = await gameStore.getSaved();
        setFilteredList(games);
        setSearch('');
    }

    const handleDeleteGame = async (game: GameDTO) => {
        try {
            popupStore.showConfirmation('Are you sure',
                `Are you sure you want to delete ${game.name} ?`, () => {
                    gameStore.deleteGame(game.id);
                    getAllGames();
                },
                () => {
                    popupStore.hide();
                });
        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }


    return (
        <div className='ProfileGamesPage-Container'>
            {loading ? <Loader /> :
                <div className='ProfileGamesPage-Wrapper'>
                    <div className='ProfileGamesPage-Title'>My Games</div>
                    <div className='ProfileGamesPage-Searchbar'>
                        <div className={`ProfileGamesPage-SearchbarContainer ${search.length > 0 ? 'active' : ''}`}>
                            <div className='ProfileGamesPage-SearchbarIcon'><Icon name="filter" /></div>
                            <div className='ProfileGamesPage-SearchbarInput'>
                                <input type="text" onKeyUp={e => { }} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter for your games" />
                            </div>
                            {search.length > 0 ? <div className='ProfileGamesPage-SearchbarIcon' onClick={handleClearSearch}><Icon name="cross" /></div> : null}
                        </div>
                    </div>
                    <div className='ProfileGamesPage-FriendsContainer'>
                        {filteredList.map((g, i) => <GamesComponent key={i} game={g} onDelete={() => handleDeleteGame(g)} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default observer(ProfileGamesPage)