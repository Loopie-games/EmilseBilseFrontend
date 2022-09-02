import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AddFriend from '../../components/friendsPages/addFriends/addFriends';
import Friends from '../../components/friendsPages/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import Loader from '../../components/shared/loader/loader';
import Popup from '../../components/shared/popups/popup';
import { Friend } from '../../models/friendship/friendInterface';
import { useStore } from '../../stores/store';
import './addFriendPage.scss'

const AddFriendPage = () => {
    const t2 = [{ r1: "asd", a2: "asd" }, { r1: "a123", a2: "123" }]

    const { friendshipStore } = useStore();
    const [filteredList, setFilteredList] = useState<Friend[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
        if (search.length > 2) {
            const debouncedSearch = setTimeout(async () => {
                await friendshipStore.searchForUsers(search);
                setFilteredList(friendshipStore._searchResults!);
            }, 500);
            return () => {
                clearTimeout(debouncedSearch);
            }
        }
        else {
            setFilteredList([]);
        }
    }, [friendshipStore, search])



    const handleClearSearch = () => {
        setFilteredList([]);
        setSearch('');
    }

    return (
        <div className='FriendsPage-Container'>
            {loading ? <div className='FriendsPage-Loading'><Loader /></div> :
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

export default observer(AddFriendPage)