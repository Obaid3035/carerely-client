import React from 'react';
import { timeAgo } from "../../../helper";

export interface IConversation {
   conversation: {
      title: string;
      time: Date;
   }[];
}

const Conversation: React.FC<IConversation> = ({ conversation }) => {
   return (
      <div>
         {conversation.map((item, index) => (
            <p key={index}>
               {item.title} <span>

            </span>
            </p>
         ))}
      </div>
   );
};

export default Conversation;
