import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../stores/store'
import Icon from '../icon/Icon'
import './searchbar.scss'

const Searchbar = () => {
    const { friendshipStore } = useStore();
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'

    const [isActivated, setIsActivated] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const handleSearch = async (query: string) => {
        //TODO
        setQuery(query);
        if (query === '' ) {
            setIsActivated(false);
            friendshipStore.clearSearchResults();
        } else if (query.length > 2) {
            setIsActivated(true);
            await friendshipStore.searchForUsers(query);
            friendshipStore._searchResults?.forEach((user) => {
                console.log(user.user.profilePicUrl);
            })
            
        }
    }

    useEffect(() => {
        return () => {
            setQuery('');
            setIsActivated(false);
        }

    }, [])

    return (
        <>
            <div className={`Searchbar_Container ${isActivated ? 'SearchActivated' : ''}`}>
                <div className='Searchbar_IconContainer' onClick={() => query === '' ? setIsActivated(!isActivated) : setIsActivated(true)}>
                    <Icon name="search" />
                </div>
                <div className='Searchbar_InputContainer'>
                    <input type="text" onBlur={() => setIsActivated(false)} onFocus={() => setIsActivated(true)} placeholder="Search" value={query} onChange={e => handleSearch(e.target.value)} />
                </div>
                {query !== '' && isActivated &&
                    <div className='Searchbar_ClearContainer' onClick={() => handleSearch('')}>
                        <Icon name="cross" />
                    </div>}
            </div>
            <div className={`Searchbar_OutPutContainer ${isActivated ? 'SearchActivated test' : ''}`}>
               
                {friendshipStore._searchResults?.map(user =>
                    <div className='Searchbar_OutPutItem' key={user.user.id} onClick={() => navigate(`/user/profile/${user.user.id}`)}>
                        <div className='Searchbar_OutPutItemImage'>
                            <img src={user.user.profilePicUrl!== undefined && user.user.profilePicUrl !== '' ? user.user.profilePicUrl : defaultPic} alt="" />
                        </div>
                        <div className='Searchbar_OutPutItemText'>
                            <div>{user.user.username}</div>
                        </div>
                        <div className='Searchbar_IconContainer'>
                            <Icon name="rightArrow" />
                        </div>
                    </div>

                )}
            </div>
        </>
    )
}

export default observer(Searchbar)