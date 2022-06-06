import React, { useEffect, useRef, useState } from "react";
import avatar from '../../../assets/img/avatar.jpg';
import { IoMdSend } from "react-icons/io";
import './ChatBox.scss'
import { getCurrentUser } from '../../../helper';
import { IConversation } from "../Chat";
import { createMessage, getAllMessagesByConversationId } from "../../../services/api/conversation";
import { IUser } from "../../../services/slices/post";
import animationData from "../../../animation/typing.json";
import { useAppDispatch, useAppSelector } from "../../../services/hook";
import { setChatNotification } from "../../../services/slices/notification";
import Lottie from "react-lottie";
import io  from "socket.io-client";

export interface IChatBox {
   selectedChat: IConversation ;
}

export interface IMessage {
   id: number;
   content: string;
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
   const ENDPOINT = 'http://localhost:4000';
   const dispatch = useAppDispatch();
   const chatNotification = useAppSelector((state) => state.notification.chatNotification)
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [user, setUser] = useState<IUser | null>(null)
   const [chatLoader, setChatLoader] = useState(false);
   const [typingMsg, setTypingMsg] = useState('');
   const [typing, setTyping] = useState(false);
   const [isTyping, setIsTyping] = useState(false);
   const [socket, setSocket] = useState(io(ENDPOINT));


   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
         preserveAspectRatio: "xMidYMid slice",
      },
   };

   useEffect(() => {
      console.log(isTyping)
      socket.emit('setup', getCurrentUser());
      socket.on('connected', () => console.log("Socket connected"));
   }, []);



   useEffect(() => {
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
   })





   useEffect(() => {
      socket.on("message received", (newMessageReceived: IMessage) => {
         console.log(newMessageReceived, "---------------")
         if (!selectedChat
           || selectedChat.id
           != newMessageReceived.conversation_id) {
            if (!chatNotification.includes(newMessageReceived)) {
               dispatch(setChatNotification([newMessageReceived, ...chatNotification]))
            }
         } else {
            console.log("Message received")
            setMessages([...messages, newMessageReceived])
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

   const sendMessage = async () => {
      socket.emit("stop typing", selectedChat.id);
      const msg: IMessage = {
         id: 10,
         sender_id: getCurrentUser().id,
         created_at: Date.now().toString(),
         conversation_id: selectedChat.id,
         content: typingMsg,
      };
      setMessages([...messages, msg]);
      const { data } = await createMessage(selectedChat?.id!, {
         content: typingMsg,
      });
      setTypingMsg('');
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
                <React.Fragment>
                   <ReceiveMsg key={index} msg={msg.content} />
                </React.Fragment>
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
        <div className="typing-box">
           <div className="typing-inp">
              <input
                placeholder="Type your message here..."
                value={typingMsg}
                onChange={(e) => onChangeHandler(e)}
              />
              <IoMdSend type="submit" onClick={sendMessage} />
           </div>
        </div>
     </div>
   )
};

export default ChatBox;
