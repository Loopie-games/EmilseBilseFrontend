import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import './profilePageMobile.scss'
import testBanner from '../../../assets/Shared/pathethic.png'
import { useStore } from '../../../stores/store'
import { UserDTO } from '../../../models/user/userInterface'
import { useParams } from 'react-router-dom'

const ProfilePageMobile = () => {
    const { userStore, popupStore } = useStore();
    const params = useParams();
    const [user, setUser] = useState<UserDTO>();
    const [isOwner, setIsOwner] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [nickname, setNickname] = useState(user?.nickname);
    const [newNickname, setNewNickname] = useState("");
    const [showing, setShowing] = useState('overview');
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'

    let testFriends = 207;

    useEffect(() => {
        if (userStore.user?.id === params.id) {
            setUser(userStore.user);
            console.log(user?.nickname);
            
            setIsOwner(true);
        } else {
            getUser();
        }
        return () => {
            setUser(undefined);
            setIsOwner(false);
            setIsInEditMode(false);
        }
    }, [])

    useEffect(() => {
        console.log(newNickname);
    }, [newNickname])
        

    const getUser = async () => {
        const user = await userStore.getUserById(params.id!);
        setUser(user);
    }

    const edit = () => {
        if (isInEditMode) {
            let oldNickname = nickname;
            //TODO save changes when endpoint is done
            setIsInEditMode(false);
            popupStore.showConfirmation(
                "Are you sure?", 
            ` You're about to change your nickname to ${newNickname}. Are you sure you want to do that ?`,
            () => {
                console.log("yes");
                setNickname(newNickname!);
            },
            () => {
                console.log("no");
                setNickname(oldNickname!);
            }
            )
            
        } else {
            setIsInEditMode(true);
        }
    }

    return (
        <div className='ProfilePageM_Container'>
            <div className='ProfilePageM_BannerContainer'>
                <img id="banner" src={testBanner} alt="" />
            </div>
            <div className='ProfilePageM_Wrapper'>
                <div className='ProfilePageM_UserInfoContainer'>
                    <div className='ProfilePageM_PbContainer'>
                        <div className='ProfilePageM_Pb'>
                            <img id='pb' src={userStore.user?.profilePicUrl ? userStore.user.profilePicUrl : defaultPic} alt="" />
                        </div>
                    </div>
                    <div className='ProfilePageM_InfoContainer'>
                        <div className='ProfilePageM_NicknameContainer'>
                            <input type='text' placeholder='Nickname' onChange={(e) => setNewNickname(e.target.value)} disabled={!isInEditMode} />
                        </div>
                        <div className='ProfilePageM_UsernameContainer'>
                            <input type='text' placeholder='Username' value={user?.username} disabled={true} />
                        </div>
                    </div>
                    {isOwner && 
                    <div className='ProfilePageM_ButtonContainer'>
                        <div className='ProfilePageM_EditButton' onClick={edit}>    
                            {isInEditMode ? "Save Changes" : "Edit User"}
                        </div>
                    </div>
                    }
                </div>
                <div className='ProfilePageM_UserBio'>
                    <input id='Bio' type="text"  disabled={!isInEditMode}/>
                </div>
                <div className='ProfilePageM_AchievementContainer'>
                <div className='ProfilePageM_FriendsContainer'>
                    <div className='ProfilePageM_FriendsTitle'>Friends - {testFriends}</div>
                        <div className='ProfilePageM_FriendsContentContainer'>
                        <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                            <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                            <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className='ProfilePageM_FriendsContainer'>
                    <div className='ProfilePageM_FriendsTitle'>Title</div>
                        <div className='ProfilePageM_FriendsContentContainer'>
                        <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                            <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                            <div className='ProfilePageM_FriendsContent'>
                                <img src={defaultPic} alt="" />
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='ProfilePageM_ContentContainer'>
                    <div className='ProfilePageM_ContentWrapper'>
                        <div className='ProfilePageM_NavContainer'>
                            <div className={`ProfilePageM_NavItem ${showing ==='overview' ? 'active' : ''}`}  onClick={() => setShowing('overview')}>Overview</div>
                            <div className={`ProfilePageM_NavItem ${showing ==='achievements' ? 'active' : ''}`} onClick={() => setShowing('achievements')}>Achievements</div>
                            <div className={`ProfilePageM_NavItem ${showing ==='friends' ? 'active' : ''}`} onClick={() => setShowing('friends')}>Friends</div>
                            <div className={`ProfilePageM_NavItem ${showing ==='tiles' ? 'active' : ''}`} onClick={() => setShowing('tiles')}>Tiles</div>
                        </div>
                        <div className='ProfilePageM_Content'>
                            {showing === 'overview' && <div>Overview</div>}
                            {showing === 'achievements' && <div>Achievements</div>}
                            {showing === 'friends' && <div>Friends</div>}
                            {showing === 'tiles' && <div>Tiles</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(ProfilePageMobile)