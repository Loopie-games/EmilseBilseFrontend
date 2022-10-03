import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Friends from '../../components/friendsPages/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import Loader from '../../components/shared/loader/loader';
import { useStore } from '../../stores/store';
import './friendsPage.scss'

const FriendsPage = () => {
    const { friendshipStore } = useStore();
    const [filteredList, setFilteredList] = useState(friendshipStore._friendlist);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const loadData = async () => {
            await friendshipStore.getFriendList(params.id!);
            setLoading(false);
            setFilteredList(friendshipStore._friendlist!);
        }

        params.id !== undefined ? loadData() : setLoading(false);
    }, [])

    /**
     * @Description Filters the friendlist based on the search input
     * @param e event from the search input
     */
    const handleSearch = (e: any) => {
        const search = e.target.value;
        const filtered = friendshipStore._friendlist!.filter(t => t.user.username.toLowerCase().includes(search.toLowerCase()) || t.user.nickname.toLowerCase().includes(search.toLowerCase()));
        setFilteredList(search.length > 0 ? filtered : friendshipStore._friendlist!);
        setSearch(search);
    }

    /**
     * @Description Clears the search input and resets the filter
     */
    const handleClearSearch = () => {
        setFilteredList(friendshipStore._friendlist!);
        setSearch('');
    }

    return (
        <div className='FriendsPage-Container'>
            {loading ? <Loader /> :
                <div className='FriendsPage-Wrapper'>
                    <div className='FriendsPage-Title'>Friendlist</div>
                    <div className='FriendsPage-Searchbar'>
                        <div className={`FriendsPage-SearchbarContainer ${search.length > 0 ? 'active' : ''}`}>
                            <div className='FriendsPage-SearchbarIcon'><Icon name="filter" /></div>
                            <div className='FriendsPage-SearchbarInput'>
                                <input type="text" onKeyUp={e => handleSearch(e)} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter for friends" />
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

export default observer(FriendsPage)