import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import * as MdIcon from 'react-icons/md';
import * as AiIcon from 'react-icons/ai';
import * as BsIcon from 'react-icons/bs';
import * as RiIcon from 'react-icons/ri';
import * as IoIcon from 'react-icons/io5';
import BrandLogo from '../../assets/img/logo.png';
import MessageBox from './MessageBox/MessageBox';
import NavProfileBox from './NavProfileBox/NavProfileBox';
import SearchBar from './SearchBar/SearchBar';
import { NavLink, useLocation } from 'react-router-dom';
import NotificationBox from './NotificationBox/NotificationBox';
import Avatar from "../../assets/img/avatar.jpg";
import './Header.scss';
import { getCurrentUser } from "../../helper";
import { IUser } from "../../services/slices/post";
import { useAppSelector } from "../../services/hook";

interface INavItem {
   path: string;
   title: string;
   icon: JSX.Element;
}

enum MessageBoxClasses {
   MESSAGE_SHOW = 'message_show',
   MESSAGE_HIDE = 'message_hide',
}

enum NotificationBoxClasses {
   NOTIFICATION_SHOW = 'notification_show',
   NOTIFICATION_HIDE = 'notification_hide',
}

enum ProfileDropDownToggle {
   DROPDOWN_HIDE = 'profile_dropdown_hide',
   DROPDOWN_SHOW = 'profile_dropdown_show',
}


const Header = () => {
   const [currentUser, setCurrentUser] = useState<IUser | null>(null);
   useEffect(() => {
      setCurrentUser(getCurrentUser())
   }, [])

   const chatNotification = useAppSelector((state) => state.notification.chatNotification)


   const navItems: INavItem[] = [
      {
         path: '/home',
         title: 'Home',
         icon: <AiIcon.AiOutlineHome />,
      },
      {
         path: '/calorie-tracker',
         title: 'Calorie Tracker',
         icon: <MdIcon.MdOutlineFastfood />,
      },
      {
         path: '/blog',
         title: 'Blogs',
         icon: <BsIcon.BsBook />,
      },
      {
         path: '/queries',
         title: 'Q&A',
         icon: <IoIcon.IoRocketOutline />,
      },
   ];

   const [notificationClasses, setNotificationClasses] = useState(
      NotificationBoxClasses.NOTIFICATION_HIDE,
   );
   const [messageClasses, setMessageClasses] = useState(
      MessageBoxClasses.MESSAGE_HIDE,
   );

   const [profileDropdownClasses, setProfileDropdownClasses] = useState(
      ProfileDropDownToggle.DROPDOWN_HIDE,
   );

   const location = useLocation();

   const onMessageClickHandler = () => {
      if (messageClasses === MessageBoxClasses.MESSAGE_SHOW) {
         setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
      } else {
         setMessageClasses(MessageBoxClasses.MESSAGE_SHOW);
         setNotificationClasses(NotificationBoxClasses.NOTIFICATION_HIDE);
         setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
      }
   };

   const onNotificationClickHandler = () => {
      if (notificationClasses === NotificationBoxClasses.NOTIFICATION_SHOW) {
         setNotificationClasses(NotificationBoxClasses.NOTIFICATION_HIDE);
      } else {
         setNotificationClasses(NotificationBoxClasses.NOTIFICATION_SHOW);
         setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
         setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
      }
   };

   const onDropdownClickHandler = () => {
      if (profileDropdownClasses === ProfileDropDownToggle.DROPDOWN_SHOW) {
         setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
      } else {
         setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_SHOW);
         setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
         setNotificationClasses(NotificationBoxClasses.NOTIFICATION_HIDE);
      }
   };

   const getActiveClass = (path: string) => {
      if (path === location.pathname) {
         return 'nav_active';
      }
      return '';
   };

   const ref = React.useRef(null);


   useEffect(() => {
      function handleClickOutside(event: any) {
         // @ts-ignore
         if (ref.current && !ref.current.contains(event.target)) {
            setNotificationClasses(NotificationBoxClasses.NOTIFICATION_HIDE);
            setProfileDropdownClasses(ProfileDropDownToggle.DROPDOWN_HIDE);
            setMessageClasses(MessageBoxClasses.MESSAGE_HIDE);
         }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [ref]);

   return (
      <Navbar bg='light' expand='md' className={"mb-5"}>
         <Navbar.Brand href='#home'>
            <NavLink to={'/home'}>
               <img className={'img-fluid'} width={55} alt='brand' src={BrandLogo} />
            </NavLink>
         </Navbar.Brand>
         <Navbar.Toggle aria-controls='basic-navbar-nav' />
         <Navbar.Collapse>
            <Nav className='w-100 '>
               <Container
                  ref={ref}
                  fluid
                  className={'w-100 d-flex justify-content-around align-items-center'}
               >
                  {navItems.map((navItem, index) => (
                     <NavLink
                        key={index}
                        to={navItem.path}
                        className={`${getActiveClass(navItem.path)} nav_link`}
                     >
                        <div className={'nav_icon'}>
                           {navItem.icon}
                        </div>
                        <p className={'nav_item'}>{navItem.title}</p>
                     </NavLink>
                  ))}

                  <SearchBar />

                  <Nav.Link className={'notify_item'}>
                     <div
                        className={'notification_icon'}
                        onClick={onMessageClickHandler}
                     >
                        <BsIcon.BsChat />
                        <span className={'badge'}>{ chatNotification.length }</span>
                     </div>
                     {
                        chatNotification.length > 0 ? <MessageBox chatNotification={chatNotification} extraClasses={messageClasses} />
                          : null
                     }
                  </Nav.Link>

                  <Nav.Link className={'notify_item'}>
                     <div
                        className='notification_icon'
                        onClick={onNotificationClickHandler}
                     >
                        <RiIcon.RiNotification3Line />
                        <span className={'badge'}>3</span>
                     </div>
                     <NotificationBox extraClasses={notificationClasses} />
                  </Nav.Link>
                  <div className={'nav_link'} onClick={onDropdownClickHandler}>
                     <div className={'nav_profile'}>
                        <p>{ currentUser?.user_name }</p>
                        <RiIcon.RiArrowDropDownLine />
                        <img
                           width={50}
                           alt={'avatar'}
                           src={currentUser?.avatar ? currentUser?.avatar : Avatar}
                           className={'ml-2'}
                        />
                     </div>
                     <NavProfileBox extraClasses={profileDropdownClasses} />
                  </div>
               </Container>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
};

export default Header;
