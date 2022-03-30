import React, { useState } from 'react';
import Avatar from '../../../assets/img/avatar.jpg';
import './ProfileHeader.scss';
import ProfileViewModal from './ProfileViewModal/ProfileViewModal';
import { IUser } from '../../../services/slices/post';
import FollowerModal from '../FollowerModal/FollowerModal';

interface IProfileHeader {
   userStats: {
      currentUserFollowers: number;
      currentUserFollowings: number;
      currentUserPostCount: number;
      user: IUser;
   };
   otherProfileId?: string
}

export enum ENDPOINT {
   FOLLOWER = "followers",
   FOLLOWING = "followings"
}

const ProfileHeader: React.FC<IProfileHeader> = ({ userStats, otherProfileId }) => {
   const [show, setShow] = useState(false);
   const [showFollowModal, setShowFollowModal] = useState(false);
   const [endPoint, setEndPoint] = useState("followings");

   const onFollowerChangeHandler = () => {
      setEndPoint(ENDPOINT.FOLLOWER);
      setShowFollowModal(!show);
   };

   const onFollowingChangeHandler = () => {
      setEndPoint(ENDPOINT.FOLLOWING);
      setShowFollowModal(!show);
   };


   return (
      <React.Fragment>
        {
          showFollowModal ?
            <FollowerModal endPoint={endPoint}
                           show={showFollowModal}
                           otherProfileId={otherProfileId}
                           onChange={() => setShowFollowModal(!showFollowModal)}
            />
            : null
        }
         <ProfileViewModal show={show} onClose={() => setShow(!show)} />
         <img onClick={() => setShow(!show)} className={'profile_img'} alt={'avatar'} width={140} src={Avatar} />
         <h5 className={'my-4'}>{ userStats.user.user_name }</h5>
         <div className={'d-flex justify-content-center align-items-center follower_stats'}>
            <div className={'text-center user_stats'}>
               <h5>{ userStats.currentUserPostCount }</h5>
               <p>Posts</p>
            </div>
            <div className={'text-center user_stats'} onClick={onFollowerChangeHandler}>
               <h5>{ userStats.currentUserFollowers }</h5>
               <p>Followers</p>
            </div>
            <div className={'text-center user_stats'} onClick={onFollowingChangeHandler}>
               <h5>{ userStats.currentUserFollowings }</h5>
               <p>Followings</p>
            </div>
         </div>
      </React.Fragment>
   );
};

export default ProfileHeader;
