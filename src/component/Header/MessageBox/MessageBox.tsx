import React from 'react';
import './MessageBox.scss';
import {useNavigate} from "react-router-dom";
import Avatar from '../../../assets/img/avatar.png';
import { IMessage } from "../../../container/Chat/ChatBox/ChatBox";

const MessageBox = (props: { extraClasses: string, chatNotification: IMessage[] }) => {
   const navigation = useNavigate();
   return (
      <div className={`message_box ${props.extraClasses}`}>
         <div className={'message_box_top'}>
            <h4>Messages</h4>
            <div>
               <h4 onClick={() => navigation('/chat')}>
                  Chat
                  <span className='badge'>1</span>
               </h4>
            </div>
         </div>
         <div className={'message_box_item'}>
            <img width={60} alt={'avatar'} src={Avatar} className={'img-fluid'} />
            <div className={'message_box_message'}>
               <h5>John Mayers</h5>
               <p>Lorem Ipsum</p>
            </div>
            <p>3 min ago</p>
         </div>
      </div>
   );
};

export default MessageBox;
