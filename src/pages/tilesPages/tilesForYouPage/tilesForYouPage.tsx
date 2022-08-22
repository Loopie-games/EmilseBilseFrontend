import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import AddFriend from '../../../components/friendsPages/addFriends/addFriends';
import Icon from '../../../components/shared/icon/Icon';
import Loader from '../../../components/shared/loader/loader';
import UserCreatedTile from '../../../components/tilesPages/userCreatedTile';
import { TileForUser } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';

const TilesForYouPage = () => {
    const { tileStore, userStore } = useStore();
    const params = useParams();
    const [filteredList, setFilteredList] = useState<TileForUser[]>(tileStore.tilesAboutUser!);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoggedInUser, setIsLoggedInUser] = useState<Boolean>();
    const [user, setUser] = useState<any>();
    const t: TileForUser[] = [{ id: '1', userNickname: 'asd', action: 'test', addedByNickname: 'asdasd' }];

    useEffect(() => {
        const load = async () => {
            //await tileStore.getTilesAboutUser(params.id!);
            const user = await userStore.getUserById(params.id!);
            setUser(user);
            setIsLoggedInUser(userStore.user?.id === params.id);

            setFilteredList(t)
            //setFilteredList(tileStore.tilesAboutUser!);
            setLoading(false);
        }
        params.id ? load() : setLoading(false);

        const debouncedSearch = setTimeout(async () => {
            console.log(search);

            setFilteredList(t.filter(t => t.action.toLowerCase().trim().includes(search.toLowerCase().trim()) || t.addedByNickname.toLowerCase().trim().includes(search.toLowerCase().trim())));
            //setFilteredList(tileStore.tilesAboutUser!.filter(t => t.action.toLowerCase().includes(search.toLowerCase()) || t.addedByNickname.toLowerCase().includes(search.toLowerCase())));
        }, 500);
        return () => {
            clearTimeout(debouncedSearch);
        }
    }, [tileStore, search, params.id])



    const handleClearSearch = () => {
        setFilteredList(t);
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