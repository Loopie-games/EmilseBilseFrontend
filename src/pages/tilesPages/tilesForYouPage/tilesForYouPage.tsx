import React, { useEffect, useState } from 'react'
import AddFriend from '../../../components/friendsPages/addFriends/addFriends';
import Icon from '../../../components/shared/icon/Icon';
import { Friend } from '../../../models/friendship/friendInterface';
import { useStore } from '../../../stores/store';

const TilesForYouPage = () => {
    const { friendshipStore } = useStore();
    const [filteredList, setFilteredList] = useState<Friend[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
        const debouncedSearch = setTimeout(async () => {
            console.log(search);
            await friendshipStore.searchForUsers(search);
            setFilteredList(friendshipStore._friendlist!);
        }, 500);
        return () => {
            clearTimeout(debouncedSearch);
        }
    }, [friendshipStore, search])



    const handleClearSearch = () => {
        setFilteredList([]);
        setSearch('');
    }


    return (
        <div className='FriendsPage-Container'>
            {loading ? <div className='FriendsPage-Loading'>Loading...</div> :
                <div className='FriendsPage-Wrapper'>
                    <div className='FriendsPage-Title'>Add Friend</div>
                    <div className='FriendsPage-Searchbar'>
                        <div className={`FriendsPage-SearchbarContainer ${search.length > 0 ? 'active' : ''}`}>
                            <div className='FriendsPage-SearchbarIcon'><Icon name="search_blue" /></div>
                            <div className='FriendsPage-SearchbarInput'>
                                <input type="text" onKeyUp={e => { }} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter for friends" />
                            </div>
                            {search.length > 0 ? <div className='FriendsPage-SearchbarIcon' onClick={handleClearSearch}><Icon name="cross" /></div> : null}
                        </div>
                    </div>
                    <div className='FriendsPage-FriendsContainer'>
                        {filteredList.map((t, i) => <AddFriend key={i} {...t} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default TilesForYouPage