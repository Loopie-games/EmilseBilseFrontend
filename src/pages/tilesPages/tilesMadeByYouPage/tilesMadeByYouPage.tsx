import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Icon from '../../../components/shared/icon/Icon';
import Loader from '../../../components/shared/loader/loader';
import UserCreatedTile from '../../../components/tilesPages/userCreatedTile';
import { UserTile } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import './tilesMadeByYouPage.scss'

const TilesMadeByYouPage = () => {
    const { tileStore, popupStore } = useStore();
    const params = useParams();
    const [filteredList, setFilteredList] = useState<UserTile[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
        getTiles()


    }, [tileStore, search, params.id, tileStore.createdTiles!])

    const getTiles = async () => {
        try {
            await tileStore.getCreatedTiles(params.id!);
            const debouncedSearch = setTimeout(async () => {
                setFilteredList(tileStore.createdTiles!.filter(t => t.action.toLowerCase().includes(search.toLowerCase()) || t.user.username.toLowerCase().includes(search.toLowerCase())));
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
        setFilteredList(tileStore.createdTiles!);
        setSearch('');
    }


    return (
        <div className='FriendsPage-Container'>
            {loading ? <Loader /> :
                <div className='FriendsPage-Wrapper'>
                    <div className='FriendsPage-Title'>Tiles Made By You</div>
                    <div className='FriendsPage-Searchbar'>
                        <div className={`FriendsPage-SearchbarContainer ${search.length > 0 ? 'active' : ''}`}>
                            <div className='FriendsPage-SearchbarIcon'><Icon name="filter" /></div>
                            <div className='FriendsPage-SearchbarInput'>
                                <input type="text" onKeyUp={e => { }} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter for tiles" />
                            </div>
                            {search.length > 0 ? <div className='FriendsPage-SearchbarIcon' onClick={handleClearSearch}><Icon name="cross" /></div> : null}
                        </div>
                    </div>
                    <div className='FriendsPage-FriendsContainer'>
                        {filteredList.map((t, i) => <UserCreatedTile key={i} {...t} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default TilesMadeByYouPage