import React, { useEffect, useState } from "react";
import { errorNotify } from '../../utils/toast';
import { Navigate, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { getCurrentUser, getToken, removeToken } from '../../helper';
import axios from 'axios';
import { USER_ROLE } from '../../App';
import { IMessage } from '../../container/Chat/ChatBox/ChatBox';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import { setChatNotification } from '../../services/slices/notification';

interface IPrivateRouteProps {
    children: JSX.Element;
    role: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children, role }) => {
    const token = getToken()
    const navigate = useNavigate()
    const selectedChat = useAppSelector((state) => state.notification.selectedChat);
    const socket = useAppSelector((state) => state.notification.socket);
    const chatNotification = useAppSelector((state) => state.notification.chatNotification);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (selectedChat) {
            setIsChatOpen(true)
        } else {
            setIsChatOpen(false)
        }
    }, [])

    if (!token) {
        errorNotify("You are not authorize")
        return <Navigate to={'/auth'} />
    }

    const decode: { user: any } = jwt(token);

    if (!decode.user) {
        removeToken();
        errorNotify("You are not authorize")
        return <Navigate to={'/auth'} />
    }

    if (decode.user && decode.user.role !== role) {
        if (decode.user.role === USER_ROLE.ADMIN) {
            errorNotify("You are not authorize")
            return <Navigate to={'/admin/blogs'} />
        } else if (decode.user.role === USER_ROLE.USER) {
            errorNotify("You are not authorize")
            return <Navigate to={'/home'} />
        }
    }

    useEffect(() => {
        socket.emit('setup', getCurrentUser());
        socket.on('connected', () => console.log("Socket connected"));
    }, []);

    useEffect(() => {
        socket.on("message received", (newMessageReceived: IMessage) => {
           if (!selectedChat) {
               dispatch(setChatNotification(
                 {
                     conversation: chatNotification.conversation.map((conversation) => {
                         if (conversation.id == newMessageReceived.conversation_id) {
                             return {
                                 ...conversation,
                                 updated_at: newMessageReceived.conversation.updated_at,
                                 latest_message: newMessageReceived.content,
                                 unseen_count: conversation.unseen_count + 1
                             }
                         }
                         return conversation
                     }),
                     allUnseenMessages: chatNotification.allUnseenMessages + 1
                 }
               ))
           }
        })
    })


    axios.get(`/auth/authorize/${token}`)
      .catch((err) => {
          if (err) {
              removeToken();
              errorNotify("You are not authorize")
              navigate("/auth")
          }
      })
    return children
};

export default PrivateRoute;
