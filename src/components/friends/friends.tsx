import { useState } from 'react'
import Icon from '../shared/icon/Icon';
import './friends.scss'

const Friends = () => {
    const [addShown, setAddShown] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'


    const handleAddClick = () => {
        setAddShown(false);
    }
    const handleExpand = () => {
        setExpanded(!expanded);
    }

    const getHeight = () => {
        if (expanded && addShown) {
            return '350px';
        }

        if (expanded && !addShown) {
            return '250px';
        }

        if (!expanded && addShown) {
            return '150px';
        }

        return '60px';
    }


    return (
        <div className='Friends-Container' style={{ "height": getHeight() }}>
            <div className='Friends-Wrapper'>
                <div className='Friends-ChevronContainer' onClick={handleExpand} style={{ 'animation': expanded ? 'openChevron 0.2s forwards ease-in' : 'closeChevron 0.2s forwards ease-out' }}><Icon name="dropdown-arrow" /></div>
                <div className='Friends-ProfilePicContainer'><img className='LoggedInUser-UserProfilePic' src={defaultPic} /></div>
                <div className='Friends-UserInfoContainer'>
                    <div className='Friends-UserInfoNickname'>nickname</div>
                    <div className='Friends-UserInfoUsername'>username</div>
                </div>
                <div className='Friends-IconContainer' onClick={() => setAddShown(!addShown)} style={{ 'animation': addShown ? 'openAdd 0.2s forwards ease-in' : 'closeAdd 0.2s forwards ease-out' }}> <Icon name="add-circle" /> </div>
                <div className='Friends-IconContainer'> <Icon name="cross-blue" /> </div>
            </div>
            {addShown ?
                <div className='Friends-AddTileContainer ' >
                    <div className='Friends-AddTileTitle'>Add title</div>
                    <div className='Friends-AddTileInputContainer'>
                        <div className='Friends-AddTileInput'>
                            <input type="text" />
                        </div>
                        <div className='Friends-AddTileButton' onClick={handleAddClick}>Add</div>
                    </div>
                </div>
                : null}
            {expanded ?
                <div className='Friends-TilesMadeContainer' >
                    <div className='Friends-TilesMadeTitle'>Tiles Made By You</div>
                    <div className='Friends-TilesMadeGrid'>
                        <div className='Friends-TilesMadeTile'>
                            <div className='Friends-TilesMadeAction'>Lorem Ipsum</div>
                            <div className='Friends-TilesMadeDelete'><Icon name='cross-blue' /></div>
                        </div>
                        <div className='Friends-TilesMadeTile'>
                            <div className='Friends-TilesMadeAction'>Lorem Ipsum</div>
                            <div className='Friends-TilesMadeDelete'><Icon name='cross-blue' /></div>
                        </div>
                    </div>
                    <div className='Friends-TilesMadeShowAll'>Show all</div>
                </div>
                : null}
        </div>
    )
}

export default Friends