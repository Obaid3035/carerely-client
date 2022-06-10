import React from 'react';
import Avatar from '../../../assets/img/avatar.jpg';
import './NotificationBox.scss';
import { INotification, NotificationStatus } from '../Header';
import { timeAgo } from '../../../utils/helper';

const NotificationBox = (props: {
   notification: INotification[];
   extraClasses: string;
}) => {
   const getNotificationText = (status: string) => {
      switch (status) {
         case NotificationStatus.Like:
            return 'liked your post';
         case NotificationStatus.Comment:
            return 'comment on your post';
         case NotificationStatus.Follow:
            return 'has followed you';
      }
   };

   const onNavigateNotification = (
      status: string,
      senderId: number,
      navigationId: number
   ) => {
      if (
         status == NotificationStatus.Like ||
         status == NotificationStatus.Comment
      ) {
         return `/post-detail/${navigationId}`;
      }
      return `/other-profile/${senderId}`;
   };

   return (
      <div className={`notification_box ${props.extraClasses}`}>
         <h4>Notification</h4>
         {props.notification.length > 0 ? (
            <React.Fragment>
               {props.notification.map((notification) => (
                  <div
                     className={'notification_box_item'}
                     key={notification.id}
                     onClick={() =>
                        (window.location.href = onNavigateNotification(
                           notification.status,
                           notification.sender.id,
                           notification.post_id
                        ))
                     }
                  >
                     <img
                        width={60}
                        alt={'avatar'}
                        src={
                           notification.sender.image
                              ? notification.sender.image.avatar
                              : Avatar
                        }
                        className={'img-fluid'}
                     />
                     <div className={'notification_box_message'}>
                        <span>
                           <h3 className={'mr-1'}>
                              {notification.sender.user_name}
                           </h3>{' '}
                           {getNotificationText(notification.status)}
                        </span>
                        <p className={'mt-1'}>
                           {timeAgo(notification.created_at)}
                        </p>
                     </div>
                  </div>
               ))}
               <p className={'text-center mt-3 view_all'}>View All</p>
            </React.Fragment>
         ) : (
            <div className="text-center">
               <p>No Notification Found</p>
            </div>
         )}
      </div>
   );
};

export default NotificationBox;
