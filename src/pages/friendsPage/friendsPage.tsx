import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Friends from '../../components/friendsPages/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import Loader from '../../components/shared/loader/loader';
import { useStore } from '../../stores/store';
import './friendsPage.scss'

const FriendsPage = () => {
    const t2 = [{ r1: "asd", a2: "asd" }, { r1: "a123", a2: "123" }]

    const { friendshipStore, userStore } = useStore();
    const [filteredList, setFilteredList] = useState(friendshipStore._friendlist);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        console.log(params);

        const loadData = async () => {
            await friendshipStore.getFriendList(params.id!);
            setLoading(false);
            setFilteredList(friendshipStore._friendlist!);
        }

        params.id !== undefined ? loadData() : setLoading(false);
        console.log(userStore.user);
        

    }, [])

    const handleSearch = (e: any) => {
        const search = e.target.value;
        const filtered = friendshipStore._friendlist!.filter(t => t.user.username.toLowerCase().includes(search.toLowerCase()) || t.user.nickname.toLowerCase().includes(search.toLowerCase()));
        setFilteredList(search.length > 0 ? filtered : friendshipStore._friendlist!);
        setSearch(search);
    }

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