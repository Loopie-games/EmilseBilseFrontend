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

const ProfileGamesPage = () => {
    const { gamesStore, popupStore } = useStore();
    const params = useParams();
    const [filteredList, setFilteredList] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
        getAllGames()
    }, [gamesStore, gamesStore.games, search, params.id])


    const getAllGames = async () => {
        try {
            //await gamesStore.getAllGames(params.id!);
            const debouncedSearch = setTimeout(async () => {
                setFilteredList(gamesStore.games!.filter(((t: { title: string; status: string; }) => t.title.toLowerCase().includes(search.toLowerCase()) || t.status.toLowerCase().includes(search.toLowerCase())))!);
            }, 500);
            return () => {
                clearTimeout(debouncedSearch);
            }
        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }

    const handleClearSearch = () => {
        setFilteredList(gamesStore.games!);
        setSearch('');
    }

    const handleDeleteGame = async (game: any) => {
        try {
            popupStore.showConfirmation('Are you sure',
                `Are you sure you want to delete ${game.title} ?`, () => {
                    gamesStore.deleteGame(game.id);
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