import { observer } from 'mobx-react-lite'
import React from 'react'
import './profileAchievements.scss'

const ProfileAchievements = (achievement: any) => {
    const defaultImage = 'https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png';
    
    const checkImage = () => {
        if (achievement.achievement.imageUrl === null || achievement.achievement.imageUrl === undefined || achievement.achievement.imageUrl === "") {
            return defaultImage
        } else {
            return achievement.achievement.imageUrl
        }
    }

    return (
        <div className='ProfileAchievements_Container'>
            <div className='ProfileAchievements_Wrapper'>
                <div className='ProfileAchievements_ImageContainer'>
                    <div className='ProfileAchievements_ImageWrapper'>
                        <img id="ProfileAchievements_Image" src={checkImage()} alt="" />
                    </div>
                </div>
                <div className='ProfileAchievements_InfoContainer'>
                    <div className='ProfileAchievements_InfoTitle'>{achievement.achievement.title}</div>
                    <div className='ProfileAchievements_InfoDescription'>{achievement.achievement.description}</div>
                </div>
            </div>
        </div>
    )
}

export default observer(ProfileAchievements)