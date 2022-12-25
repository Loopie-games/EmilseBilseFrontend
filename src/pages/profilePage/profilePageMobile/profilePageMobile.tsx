import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import './profilePageMobile.scss'
import testBanner from '../../../assets/Shared/pathethic.png'
import { useStore } from '../../../stores/store'
import { UserDTO } from '../../../models/user/userInterface'
import { useNavigate, useParams } from 'react-router-dom'
import Filter from '../../../components/shared/filter/filter'
import filterService from '../../../services/filterService'
import ProfileFriends from '../../../components/profile/friends/profileFriends'
import Loader from '../../../components/shared/loader/loader'
import ProfileTiles from '../../../components/profile/tiles/profileTiles'
import ProfileAchievements from '../../../components/profile/achievements/profileAchievements'

const ProfilePageMobile = () => {
    const { userStore, popupStore, tileStore, friendshipStore } = useStore();
    const params = useParams();
    const [user, setUser] = useState<UserDTO>();
    const [isOwner, setIsOwner] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [nickname, setNickname] = useState(user?.nickname);
    const [newNickname, setNewNickname] = useState("");
    const [showing, setShowing] = useState('overview');
    const navigate = useNavigate();
    const [testPB, setTestPB] = useState("");
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [placeholder, setPlaceholder] = useState('');
    const defaultImage = 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png';
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const defaultBanner = 'https://res.cloudinary.com/moonbaboon/image/upload/v1670418295/u4yzxz6oryahlm9wisoc.png'

    const [testAchievements, setTestAchievements] = useState<any[]>([
        {
            achievement: {
                id: 1,
                title: "First achievement",
                description: "First achievement description",
            }
        },
        {
            achievement: {
                id: 2,
                title: "Second achievement",
                description: "Second achievement description",
            }
        },
        {
            achievement: {
                id: 3,
                title: "Third achievement",
                description: "Third achievement description",
            }
        },
    ]);
    let testFriends = 207;

    useEffect(() => {


        if (userStore.user?.id === params.id) {
            setIsOwner(true);
            setUser(userStore.user);
        } else {
            setIsOwner(false);
            getUser();
        }

        if (showing === 'friends') {
            getFriendList();
        }

        const loadFriends = async () => {
            await friendshipStore.getFriendList(params.id!);
        }
        const loadTiles = async () => {
            await tileStore.getTilesAboutUser(params.id!);
        }
        loadTiles();
        loadFriends();

        return () => {
            setIsOwner(false);
            setUser(undefined);
        }

    }, [params.id])

    const getUser = async () => {
        const user = await userStore.getUserById(params.id!);
        setUser(user);
    }

    const getFriendList = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('friends');
        if (friendshipStore._friendlist === undefined) {
            await friendshipStore.getFriendList(params.id!);
        } else {
            setFiltered(friendshipStore._friendlist!);
        }
        setLoading(false);
    }

    const getTilesAboutUser = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('tiles');
        if (tileStore.tilesAboutUser?.length === undefined) {
            await tileStore.getTilesAboutUser(params.id!);
        } else {
            setFiltered(tileStore.tilesAboutUser!);
        }
        setLoading(false);
    }

    const getAchievements = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('achievements');

        // await userStore.getAchievements(params.id!);
        if (testAchievements.length === 0) {
            //await userStore.getAchievements(params.id!);
        } else {
            setFiltered(testAchievements);
        }
        setLoading(false);
    }


    const edit = () => {
        if (isInEditMode) {
            //TODO save changes when endpoint is done
            setIsInEditMode(false);
        } else {
            setIsInEditMode(true);
        }
    }



    const uploadProfilePic = async (event: any) => {
        const file = event[0]
        const response = await userStore.updateProfilePic(file);
        setTestPB(response);
    }

    const filterInAchievements = (query: string) => {
        if (testAchievements !== undefined) {
            setFiltered(filterService.filterInAchievements(query, testAchievements));
        }
    }

    const filterInFriends = (query: string) => {
        if (friendshipStore._friendlist !== undefined) {
            setFiltered(filterService.filterForFriends(query, friendshipStore._friendlist));
        }
    }

    const filterInTiles = (query: string) => {
        if (tileStore.tilesAboutUser !== undefined) {
            setFiltered(filterService.filterForTiles(query, tileStore.tilesAboutUser));
        }
    }

    const filter = (query: string) => {

        switch (showing) {
            case 'achievements':
                filterInAchievements(query);
                break;
            case 'friends':
                filterInFriends(query);
                break;
            case 'tiles':
                filterInTiles(query);
                break;
            default:
                break;
        }
    }

    const getPlaceholderText = () => {
        switch (showing) {
            case 'achievements':
                return 'Search for achievements';
            case 'friends':
                return 'Search for friends';
            case 'tiles':
                return 'Search for tiles';
            default:
                return '';
        }
    }

    useEffect(() => {
        filter('');
        setPlaceholder(getPlaceholderText());
    }, [showing, friendshipStore._friendlist, tileStore.tilesAboutUser])

    return (
        <div className='ProfilePageM_Container'>
            <div className='ProfilePageM_BannerContainer'>
                <img id="banner" src={defaultBanner} alt="" />
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
                            <input type='text' placeholder='Nickname' value={user?.nickname} onChange={(e) => setNewNickname(e.target.value)} disabled={!isInEditMode} />
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
                {/*
                <div className='ProfilePageM_UserBio'>
                    <input id='Bio' type="text" disabled={!isInEditMode} />
                </div>
                */}
                <div className='ProfilePageM_AchievementContainer'>
                    <div className='ProfilePageM_FriendsContainer'>
                        <div className='ProfilePageM_FriendsTitle'>Friends - {friendshipStore._friendlist?.length}</div>
                        <div className='ProfilePageM_FriendsContentContainer'>

                            {friendshipStore._friendlist?.slice(0, 3).map((friend, index) => (
                                <div className='ProfilePageM_FriendsContent'>
                                    <img src={defaultPic} alt="" onClick={() => navigate('/user/profile/' + friend.user.id)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*
                    <div className='ProfilePageM_FriendsContainer'>
                        <div className='ProfilePageM_FriendsTitle'>Achievements - {testAchievements.length}</div>
                        <div className='ProfilePageM_FriendsContentContainer'>
                            {testAchievements.slice(0, 3).map((achievement, index) => (
                                <div className='ProfilePageM_FriendsContent'>
                                    <img src={defaultImage} alt="" />
                                </div>
                            ))}
                        </div>

                    </div>
                    */}
                </div>
                <div className='ProfilePageM_ContentContainer'>
                    <div className='ProfilePageM_ContentWrapper'>
                        <div className='ProfilePageM_NavContainer'>

                            {/*
                            <div className={`ProfilePageM_NavItem ${showing === 'overview' ? 'active' : ''}`} onClick={() => setShowing('overview')}>
                                Overview
                            </div>
                            <div className={`ProfilePageM_NavItem ${showing === 'achievements' ? 'active' : ''}`} onClick={() => getAchievements()}>
                                Achievements
                            </div>
                            
                            */}
                            <div className={`ProfilePageM_NavItem ${showing === 'friends' ? 'active' : ''}`} onClick={() => getFriendList()}>
                                Friends
                            </div>
                            <div className={`ProfilePageM_NavItem ${showing === 'tiles' ? 'active' : ''}`} onClick={() => getTilesAboutUser()}>
                                Tiles
                            </div>
                        </div>
                        <div className='ProfilePageM_Content'>
                            {showing !== 'overview' &&
                                <div className='ProfilePage_FilterContainer'>
                                    <div className='ProfilePage_FilterWrapper'>
                                        <Filter filter={(e: string) => filter(e)} placeholder={placeholder} />
                                    </div>
                                </div>
                            }
                            {/*
                            {showing === 'overview' && <div>Overview</div>}
                            {showing === 'achievements' && <>
                                {loading ? <Loader /> :
                                    <div className='ProfilePageM_cContainer'>
                                        {filtered.map((Achievements) => (
                                            <ProfileAchievements key={Achievements.achievement.id} {...Achievements} />
                                        ))}
                                    </div>
                                }
                            </>}
                            */}
                            {showing === 'friends' && <>
                                {loading ? <Loader /> :
                                    <div className='ProfilePageM_cContainer'>
                                        {filtered.map((friend) => (
                                            <ProfileFriends key={friend.id} {...friend} />
                                        ))}
                                    </div>
                                }
                            </>}
                            {showing === 'tiles' &&
                                <>
                                    {loading ? <Loader /> :
                                        <div className='ProfilePageM_cContainer'>
                                            {filtered.map((tiles) => (
                                                <ProfileTiles key={tiles.id} {...tiles} />
                                            ))}
                                        </div>
                                    }
                                </>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default observer(ProfilePageMobile)