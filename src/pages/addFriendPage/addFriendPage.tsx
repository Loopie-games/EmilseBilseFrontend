import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Friends from '../../components/friendsPages/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import { useStore } from '../../stores/store';
import './addFriendPage.scss'

const AddFriendPage = () => {
    const t2 = [{ r1: "asd", a2: "asd" }, { r1: "a123", a2: "123" }]

    const { friendshipStore } = useStore();
    const [filteredList, setFilteredList] = useState(friendshipStore._friendlist);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        setLoading(false);  
        const debouncedSearch = setTimeout(async () => {
            console.log(search);
            await friendshipStore.searchForUsers(search);
            setFilteredList(friendshipStore._friendlist);
        }, 500);
        return () => {
            clearTimeout(debouncedSearch);
        }
    }, [ search ])



    const handleClearSearch = () => {
        setFilteredList(friendshipStore._friendlist!);
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
                        {filteredList?.map((t, i) => <Friends key={i} {...t} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default AddFriendPage