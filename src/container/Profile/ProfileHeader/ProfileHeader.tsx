import React, { useState } from 'react';
import Avatar from '../../../assets/img/avatar.png';
import './ProfileHeader.scss';
import ProfileViewModal from './ProfileViewModal/ProfileViewModal';

const ProfileHeader = () => {
   const [show, setShow] = useState(false);


   return (
      <React.Fragment>
         <ProfileViewModal show={show} onClose={() => setShow(!show)} />
         <img onClick={() => setShow(!show)} className={'profile_img'} alt={'avatar'} width={140} src={Avatar} />
         <h5 className={'my-4'}>Jen Smith</h5>
         <div className={'d-flex justify-content-center align-items-center follower_stats'}>
            <div className={'text-center'}>
               <h5>200</h5>
               <p>Posts</p>
            </div>
            <div className={'text-center'}>
               <h5>200</h5>
               <p>Followers</p>
            </div>
            <div className={'text-center'}>
               <h5>200</h5>
               <p>Following</p>
            </div>
         </div>
      </React.Fragment>
   );
};

export default ProfileHeader;
