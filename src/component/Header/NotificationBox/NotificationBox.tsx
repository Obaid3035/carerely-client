import React from 'react';
import Avatar from '../../../assets/img/avatar.png';
import './NotificationBox.scss';

const NotificationBox = (props: { extraClasses: string }) => {
   return (
      <div className={`notification_box ${props.extraClasses}`}>
         <h4>Notification</h4>
         <div className={'notification_box_item'}>
            <img width={60} alt={'avatar'} src={Avatar} className={'img-fluid'} />
            <div className={'notification_box_message'}>
               <span><h3>John Mayers</h3> liked your post</span>
               <p className={'mt-1'}>Just Now</p>
            </div>

         </div>
      </div>
   );
};

export default NotificationBox;
