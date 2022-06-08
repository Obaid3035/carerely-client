import React from 'react';
import './MessageBox.scss';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../assets/img/avatar.png';
import { useAppDispatch } from '../../../services/hook';
import { setSelectedChat } from "../../../services/slices/notification";
import { getCurrentUser, timeAgo } from "../../../helper";
import { IConversation } from '../../../container/Chat/Chat';

export interface IChatNotification {
   conversation: IConversation[];
   allUnseenMessages: number
}

const MessageBox = (props: {
   extraClasses: string;
   chatNotification: IChatNotification
}) => {
   const dispatch = useAppDispatch();

   const navigation = useNavigate();
   const onConversationClickHandler = (conversation: IConversation) => {
      dispatch(setSelectedChat(conversation));
      navigation("/chat")
   };
   return (
      <div className={`message_box ${props.extraClasses}`}>
         <div className={'message_box_top'}>
            <h4>Messages</h4>
            <div>
               <h4 onClick={() => navigation('/chat')}>
                  Chat
               </h4>
            </div>
         </div>
         {props.chatNotification.conversation.length > 0 ? (
           props.chatNotification.conversation.map((conversation: any) => (
             <div
               className={'message_box_item'}
               key={conversation.id}
               onClick={() => onConversationClickHandler(conversation)}
             >
                <img
                  width={60}
                  alt={'avatar'}
                  src={Avatar}
                  className={'img-fluid'}
                />
                {
                   conversation.sender_id == getCurrentUser().id ? (
                     <div className={'message_box_message'}>
                        <h5>{conversation.receiver.user_name}</h5>
                        <div>
                           <p>{conversation.latest_message}</p>

                        </div>
                     </div>
                   ) : (
                     <div className={'message_box_message'}>
                        <h5>{conversation.sender.user_name}</h5>
                        <p>{conversation.latest_message}</p>
                     </div>
                   )
                }

                <p>{timeAgo(conversation.updated_at)}</p>
                <p className="badge" id={"unseen_badge"}>{conversation.unseen_count}</p>
             </div>
           ))
         ) : (
           <div className="text-center">
              <p>No Conversation Found</p>
           </div>
         )}
      </div>
   );
};

export default MessageBox;
