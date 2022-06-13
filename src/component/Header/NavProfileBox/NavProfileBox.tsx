import React from 'react';
import * as FiIcon from 'react-icons/fi';
import * as CgIcon from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import './NavProfileBox.scss';
import { getCurrentUser, removeToken } from "../../../utils/helper";
import { AiOutlineHistory } from "react-icons/ai"
import { useAppSelector } from "../../../services/hook";


const NavProfileBox = (props: { extraClasses: string }) => {
   const navigation = useNavigate();
   const socket = useAppSelector((state) => state.notification.socket)

   const onLogOutHandler = () => {
      socket.emit("delete", getCurrentUser())
      removeToken();
      navigation("/auth")
   }

   return (
      <div className={`profile_dropdown ${props.extraClasses}`}>
         <div>
            <div className={'profile_dropdown_item'} onClick={() => navigation('/profile')}>
               <CgIcon.CgProfile />
               <p>Profile</p>
            </div>
            <div className={'profile_dropdown_item'} onClick={() => navigation('/setting')}>
               <FiIcon.FiSettings />
               <p>Settings</p>
            </div>
            <div className={'profile_dropdown_item'} onClick={() => navigation('/history')}>
               <AiOutlineHistory />
               <p>History Log</p>
            </div>
            <div className={'profile_dropdown_item'} onClick={onLogOutHandler}>
               <FiIcon.FiLogOut />
               <p>Logout</p>
            </div>
         </div>
      </div>
   );
};
export default NavProfileBox;
