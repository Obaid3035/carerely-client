import React  from 'react';
import './Conversation.scss'
import ConversationCard from './ConversationCard/ConversationCard';
import Search from './Search/Search';
import { IConversation } from "../Chat";
import Loader from "../../../component/Loader/Loader";

export interface IConversationProps {
   conversations: IConversation[]
   isLoading: boolean
}


const Conversation: React.FC<IConversationProps> = ({ conversations, isLoading }) => {
   let conversationBox
   if (isLoading) {
      conversationBox = (
        <div className="text-center">
           <Loader/>
        </div>
      )
   }

   if (!isLoading && conversations.length <= 0) {
      conversationBox = (
        <div className="text-center">
           <p className={"text-muted mt-3"}>No Conversation Found</p>
        </div>
      )
   }

   if (!isLoading && conversations.length > 0) {
      conversationBox = conversations.map((item , index: number) => (
        <ConversationCard
          key={index}
          info={item}
        />
      ))
   }

   return (
      <div className='conversation-container'>
         <Search/>
         { conversationBox }
      </div>
   );
};

export default Conversation;
