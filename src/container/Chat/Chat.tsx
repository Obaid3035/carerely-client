import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Conversation from './Conversation/Conversation';
import ChatBox from './ChatBox/ChatBox';

const Chat = () => {
   const conversation = [
      {
         title: 'Lorem',
         time: new Date(),
      },
      {
         title: 'Lorem',
         time: new Date(),
      },
      {
         title: 'Lorem',
         time: new Date(),
      },
   ];

   return (
      <Row>
         <Col md={4}>
            <Conversation conversation={conversation} />
         </Col>
         <Col md={8}>
            <ChatBox />
         </Col>
      </Row>
   );
};

export default Chat;
