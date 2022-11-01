import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import AddFriend from '../../../components/friendsPages/addFriends/addFriends';
import Icon from '../../../components/shared/icon/Icon';
import Loader from '../../../components/shared/loader/loader';
import UserCreatedTile from '../../../components/tilesPages/userCreatedTile';
import {UserTile} from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';

const TilesForYouPage = () => {
    const { tileStore, userStore, popupStore } = useStore();
    const params = useParams();
    const [filteredList, setFilteredList] = useState<UserTile[]>(tileStore.tilesAboutUser!);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoggedInUser, setIsLoggedInUser] = useState<Boolean>();
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const load = async () => {
            try{
            let u = await userStore.getUserById(params.id!)
            setUser(u)
            await  tileStore.getTilesAboutUser(params.id!)
            setIsLoggedInUser(userStore.user?.id === params.id);
            setFilteredList(tileStore.tilesAboutUser!);
            setLoading(false);
            } catch (e :any) {
                popupStore.setErrorMessage(e.message);
                popupStore.show();
            }
        }
        params.id ? load() : setLoading(false);

        const debouncedSearch = setTimeout(async () => {
                        setFilteredList(tileStore.tilesAboutUser!.filter(t => t.action.toLowerCase().includes(search.toLowerCase()) || t.user.username.toLowerCase().includes(search.toLowerCase())));
        }, 500);
        return () => {
            clearTimeout(debouncedSearch);
        }
    }, [tileStore, search, params.id])



    const handleClearSearch = () => {
        setFilteredList(tileStore.tilesAboutUser!);
        setSearch('');
    }


    return (
        <div className='FriendsPage-Container'>
            {loading ? <Loader /> :
                <div className='FriendsPage-Wrapper'>
                    <div className='FriendsPage-Title'>Tiles Made For {isLoggedInUser ? 'You' : `${user.nickname}`}</div>
                    <div className='FriendsPage-Searchbar'>
                        <div className={`FriendsPage-SearchbarContainer ${search.length > 0 ? 'active' : ''}`}>
                            <div className='FriendsPage-SearchbarIcon'><Icon name="filter" /></div>
                            <div className='FriendsPage-SearchbarInput'>
                                <input type="text" onKeyUp={e => { }} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter tile action or whoomst it was added" />
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

export default TilesForYouPage