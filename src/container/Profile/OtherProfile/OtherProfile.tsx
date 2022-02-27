import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../../../component/Button/Button';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePost from '../ProfilePost/ProfilePost';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../services/slices/post';
import { BsFillChatFill } from 'react-icons/bs';
import { MdPersonAddAlt } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../services/hook';
import './OtherProfile.scss';
import NotFriend from '../NotFriend/NotFriend';

const OtherProfile = () => {
   const { id } = useParams();
   const postState = useAppSelector((state) => state.post);
   const dispatch = useAppDispatch();

   useEffect(() => {
      id && dispatch(getUserById({
         id,
      }));
   }, []);
   const [toggle, setToggle] = useState(true);
   const followToggleHandler = () => {
      setToggle(!toggle);
   };

   let data = <ProfilePost />;
   let unFollowBtn: null | JSX.Element = (
      <div className={'mt-3 unfollow_btn'}>
         <Button className={'mr-2'}> <BsFillChatFill /><span>Message</span></Button>
         <Button onClick={followToggleHandler} className={'ml-2'}> <span>UnFollow</span></Button>
      </div>
   );


   if (toggle) {
      data = <NotFriend onClick={followToggleHandler} />;
      unFollowBtn = null;
   }


   return (
      <Container>
         <Row className={'mx-4 my-3 other_profile justify-content-center align-items-center'}>
            <Col md={12} className={'profile_header text-center py-4 mb-5'}>
               <ProfileHeader />
               {unFollowBtn}
            </Col>
            {data}
         </Row>
      </Container>
   );
};

export default OtherProfile;
