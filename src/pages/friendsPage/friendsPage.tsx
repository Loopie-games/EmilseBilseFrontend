import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Friends from '../../components/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import { useStore } from '../../stores/store';
import './friendsPage.scss'

const FriendsPage = () => {
    const t2 = [{ r1: "asd", a2: "asd" }, { r1: "a123", a2: "123" }]

    const [filteredList, setFilteredList] = useState(t2);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate()
    const { friendshipStore } = useStore();


    useEffect(() => {
        console.log(params);

        const loadData = async () => {
            await friendshipStore.getFriendList(params.id!);
            setLoading(false);
        }

        params.id !== undefined ? loadData() : setLoading(false);
    }, [])

    const handleSearch = (e: any) => {
        const search = e.target.value;
        const filtered = t2.filter(t => t.r1.includes(search) || t.a2.includes(search));
        setFilteredList(search.length > 0 ? filtered : t2);
        setSearch(search);
    }

    const handleClearSearch = () => {
        setFilteredList(t2);
        setSearch('');
    }

    return (
        <div className='FriendsPage-Container'>
            <div className='FriendsPage-NavBackground'></div>
            {loading ? <div className='FriendsPage-Loading'>Loading...</div> :
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
                        <Friends />
                    </div>
                </div>
            }
        </div>
    )
}

export default FriendsPage