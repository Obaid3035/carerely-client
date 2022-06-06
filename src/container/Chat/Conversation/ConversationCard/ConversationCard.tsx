import React, { SetStateAction, useEffect, useState } from 'react';
import avatar from '../../../../assets/img/avatar.jpg';
import { getCurrentUser, timeAgo } from '../../../../helper';
import './ConversationCard.scss'
import { IConversation } from "../../Chat";

export interface IConversationCard {
   info: IConversation
   setSelectedChat: React.Dispatch<SetStateAction<IConversation | null>>;
   selectedChat: IConversation
}

const ConversationCard : React.FC<IConversationCard> = ({info, setSelectedChat, selectedChat}) => {

   const getSelectedChatClass = () => {
      if (selectedChat) {
         if (selectedChat.id === info.id) {
            return "-selected"
         }
      }
      return ""
   }

   return (

      <div className={`card-container ${getSelectedChatClass()}`} onClick={() => {
         setSelectedChat(info)
      }}>
         <img className='profile-pic' src={avatar} alt={'avatar'}/>
         <div className="convo">
            <div className='convo-desc'>
               <h6 className='convo-desc-name'>
                  {info.sender_id === getCurrentUser().id ? info.receiver.user_name : info.sender.user_name}
               </h6>
               <p className='convo-desc-content'>
                  {info.latest_message}
               </p>
            </div>
            <span className='convo-time'>
          {/*{timeAgo(info.time.toDateString())}*/}
        </span>
         </div>
      </div>
   )
};

export default ConversationCard
