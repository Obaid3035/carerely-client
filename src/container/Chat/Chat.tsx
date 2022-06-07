import React, { useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import Conversation from './Conversation/Conversation';
import ChatBox from './ChatBox/ChatBox';
import { getAllConversations } from "../../services/api/conversation";
import { useAppSelector } from "../../services/hook";


export interface IConversation {
  id: number;
  sender_id: number;
  receiver_id: number;
  latest_message: string,
  created_at: string;
  updated_at: string;
  sender:{
    id: number;
    user_name: string;
  };
  receiver: {
    id: number;
    user_name: string;
  },
  unseen_count: number
}

const Chat = () => {
  const [conversation, setConversation] = useState<IConversation[]>([])
  const [isConversationLoading, setIsConversationLoading] = useState(false)
  const selectedChat = useAppSelector((state) => state.notification.selectedChat);

  useEffect(() => {
    setIsConversationLoading(true)
    getAllConversations()
      .then((res) => {
        setIsConversationLoading(false)
        setConversation(res.data)
      })
      .catch(() => {
        setIsConversationLoading(false)
      })
  }, [])



   return (
     <Row className='px-3'>
       <Col md={4}>
         <Conversation isLoading={isConversationLoading} conversations={conversation}/>
       </Col>
       <Col md={8}>
         {
           selectedChat ? <ChatBox selectedChat={selectedChat}/> : (
             <div className={'d-flex justify-content-center align-items-center h-100'}>
               <p className={'text-muted'}>Please select a conversation</p>
             </div>
           )
         }

       </Col>
     </Row>
   );
};

export default Chat;
