import React, { useEffect, useRef, useState } from "react";
import avatar from '../../../assets/img/avatar.jpg';
import { IoMdSend } from "react-icons/io";
import './ChatBox.scss'
import { getCurrentUser } from '../../../helper';
import { IConversation } from "../Chat";
import { createMessage, getAllMessagesByConversationId, updateMessage } from "../../../services/api/conversation";
import { IUser } from "../../../services/slices/post";
import animationData from "../../../animation/typing.json";
import { useAppSelector, useAppDispatch } from "../../../services/hook";
import { setChatNotification } from "../../../services/slices/notification";
import Lottie from "react-lottie";
import Loader from "../../../component/Loader/Loader";

export interface IChatBox {
   selectedChat: IConversation ;
}

export interface IMessage {
   id: number;
   content: string;
   conversation: IConversation,
   sender: IUser,
   sender_id: number;
   created_at: string;
   conversation_id: number
}

interface IMessageData {
   message: IMessage[];
   user: IUser;
}

const ReceiveMsg: React.FC<any> = ({ msg }) => {
   return <div className="msg-other">{msg}</div>;
};
const SendMsg: React.FC<any> = ({ msg }) => {
   return <div className="msg-me">{msg}</div>;
};

const ChatBox: React.FC<IChatBox> = ({ selectedChat }) => {
   const socket = useAppSelector((state) => state.notification.socket)
   const chatNotification = useAppSelector((state) => state.notification.chatNotification)
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [user, setUser] = useState<IUser | null>(null)
   const [chatLoader, setChatLoader] = useState(false);
   const [typingMsg, setTypingMsg] = useState('');
   const [typing, setTyping] = useState(false);
   const [isTyping, setIsTyping] = useState(false);
   const dispatch = useAppDispatch();


   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };

   useEffect(() => {
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
   }, []);



   useEffect(() => {
      socket.on("message received", (newMessageReceived: IMessage) => {
         if (selectedChat){
            dispatch(setChatNotification(
              {
                 conversation: chatNotification.conversation.map((conversation) => {
                    if (conversation.id == newMessageReceived.conversation_id) {
                       return {
                          ...conversation,
                          updated_at: newMessageReceived.conversation.updated_at,
                          latest_message: newMessageReceived.content,
                          unseen_count: (conversation.unseen_count - 1) < 0 ? 0 : conversation.unseen_count - 1
                       }
                    }
                    return conversation
                 }),
                 allUnseenMessages: (chatNotification.allUnseenMessages - 1) < 0 ? 0 : chatNotification.allUnseenMessages - 1
              }
            ))
            setMessages([...messages, newMessageReceived])
            updateMessage(newMessageReceived.id)
              .then((res) => {

              })
         }
      })
   })

   useEffect(() => {
      setChatLoader(true);
      getAllMessagesByConversationId(selectedChat.id)
        .then((res: { data: IMessageData} ) => {
           setMessages(res.data.message);
           setUser(res.data.user);
           setChatLoader(false)
           dispatch(setChatNotification({
              conversation: chatNotification.conversation.map((conversation) => {
                if (conversation.id == selectedChat.id) {
                   return {
                      ...conversation,
                      unseen_count: 0
                   }
                }
                 return conversation
              }),
              //@ts-ignore
              allUnseenMessages: chatNotification.allUnseenMessages - chatNotification.conversation.reduce((acc: any, curVal: any) => {
                 return +curVal.unseen_count + +acc.unseen_count
              }, { unseen_count: 0})
           }))
           socket.emit("join chat", selectedChat.id);
        })
        .catch(() => {
           setChatLoader(false);
        });
   }, [selectedChat]);

   useEffect(() => {
      scrollToBottom();
   }, [messages]);


   const messagesEndRef = useRef(document.createElement('div'));

   const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
   };

   const sendMessage = async (event: any) => {
      event.preventDefault();
      socket.emit("stop typing", selectedChat.id);
      const msg: any = {
         sender_id: getCurrentUser().id,
         created_at: Date.now().toString(),
         conversation_id: selectedChat.id,
         content: typingMsg,
      };
      setMessages([...messages, msg]);
      setTypingMsg('');
      const { data } = await createMessage(selectedChat?.id!, {
         content: typingMsg,
      });
      socket.emit("new message", data)
   };


   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTypingMsg(e.target.value)

      if (!typing) {
         setTyping(true);
         socket.emit("typing", selectedChat.id);
      }
      const lastTypingTime = new Date().getTime();
      const timerLength = 3000;
      setTimeout(() => {
         const timeNow = new Date().getTime();
         const timeDiff = timeNow - lastTypingTime;
         if (timeDiff >= timerLength && typing) {
            socket.emit("stop typing", selectedChat.id);
            setTyping(false);
         }
      }, timerLength);
   }


   return (
     <div className={"chat"}>
        <div className="chat-header">
           <img className="chat-header-dp" src={avatar} alt="avatar" />
           <div className="header-info">
              <h5 className="header-info-title">
                 {user && user.user_name}
              </h5>
           </div>
        </div>

        <div className="chat-msg">
           {messages.map((msg, index) => {
              return msg.sender_id === getCurrentUser().id ? (
                <SendMsg key={index} msg={msg.content} />
              ) : (
                <ReceiveMsg key={index} msg={msg.content} />
              );
           })}
           <div ref={messagesEndRef} />
        </div>
        {isTyping ? (
          <Lottie
            options={defaultOptions}
            height={23}
            width={53}
            style={{ marginTop: 15, marginLeft: 12 }}
          />
        ) : (
          <></>
        )}
        <form className="typing-box" onSubmit={sendMessage}>
           <div className="typing-inp">
              <input
                placeholder="Type your message here..."
                value={typingMsg}
                onChange={(e) => onChangeHandler(e)}
              />
              <button>
                 <IoMdSend type="submit" />
              </button>
           </div>
        </form>
     </div>
   )
};

export default ChatBox;
