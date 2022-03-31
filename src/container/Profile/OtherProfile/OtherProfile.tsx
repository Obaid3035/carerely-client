import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../../../component/Button/Button';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePost from '../ProfilePost/ProfilePost';
import { useParams, useNavigate } from 'react-router-dom';
import { BsFillChatFill } from 'react-icons/bs';
import './OtherProfile.scss';
import NotFriend from '../NotFriend/NotFriend';
import { otherProfile, otherProfilePost } from '../../../services/api/post';
import {
   acceptRequest,
   rejectRequest,
   sendFollowRequest,
   unFollowRequest,
} from '../../../services/api/friendShip';
import { getCurrentUser } from "../../../helper";

enum FriendShipStatus {
   view = 'VIEW',
   accept = 'ACCEPT',
   send = 'SEND',
}

const OtherProfile = () => {
   const { id } = useParams();
   const navigation = useNavigate();
   useEffect(() => {
      if (id == getCurrentUser().id) {
         navigation("/profile");
      }
   }, [])

   const [userStats, setUserStats] = useState<any>({
      currentUserFollowers: 0,
      currentUserFollowings: 0,
      currentUserPostCount: 0,
      user: null,
   });
   const [page, setPage] = useState(0);
   const [size, setSize] = useState(3);
   const [hasMore, setHasMore] = useState(true);
   const [posts, setPosts] = useState<any>([]);
   const [postCount, setPostCount] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [friendShip, setFriendShip] = useState(false);
   const [friendShipStatus, setFriendShipStatus] = useState<FriendShipStatus>(
      FriendShipStatus.send
   );
   useEffect(() => {
      setIsLoading(true);
      otherProfile(id!).then((res) => {
         setIsLoading(false);
         setUserStats({
            currentUserPostCount: res.data.postCount,
            currentUserFollowings: res.data.followingCount,
            currentUserFollowers: res.data.followersCount,
            user: res.data.user,
         });
      });
   }, []);

   useEffect(() => {
      otherProfilePost(id!, page, size).then((res) => {
         setFriendShipStatus(res.data.status);
         if (res.data.friendship) {
            setFriendShip(true);
            setPosts(res.data.posts);
            setPostCount(res.data.count);
         }
      });
   }, [friendShip]);

   const unfollowHandler = () => {
      unFollowRequest(id!).then((res) => {
         if (res.data.deleted) {
            setFriendShipStatus(res.data.status);
            setUserStats({
               ...userStats,
               currentUserFollowers: userStats.currentUserFollowers - 1,
            });
         }
      });
   };
   const followHandler = () => {
      sendFollowRequest(id!).then((res) => {
         if (res.data.saved) {
            setFriendShipStatus(res.data.status);
            setFriendShip(true);
            setUserStats({
               ...userStats,
               currentUserFollowers: userStats.currentUserFollowers + 1,
            });
         }
      });
   };

   const fetchMoreData = () => {
      if (posts.length === postCount) {
         setHasMore(false);
         return;
      }

      otherProfilePost(id!, page + 1, size).then((res) => {
         setPage(page + 1);
         setPosts([...posts, ...res.data.posts]);
         setPostCount(res.data.count);
      });
   };

   const onAcceptRequestHandler = () => {
      acceptRequest(id!).then((res) => {
         if (res.data.updated) {
            setUserStats({
               ...userStats,
               currentUserFollowers: userStats.currentUserFollowers + 1,
            });
            otherProfilePost(id!, page, size).then((res) => {
               setFriendShipStatus(res.data.status);
               if (res.data.friendship) {
                  setFriendShip(true);
                  setPosts(res.data.posts);
                  setPostCount(res.data.count);
               }
            });
         }
      });
   };

   const onRejectRequestHandler = () => {
      rejectRequest(id!).then((res) => {
         setFriendShipStatus(res.data.status);
         setUserStats({
            ...userStats,
            currentUserFollowings: userStats.currentUserFollowings - 1,
         });
      });
   };

   let data;
   let unFollowBtn: any;

   if (friendShipStatus === FriendShipStatus.send) {
      data = <NotFriend onClick={followHandler} />;
      unFollowBtn = null;
   }

   if (friendShipStatus === FriendShipStatus.view && posts) {
      unFollowBtn = (
         <div className={'mt-3 unfollow_btn'}>
            <Button className={'mr-2'}>
               <BsFillChatFill />
               <span>Message</span>
            </Button>
            <Button onClick={unfollowHandler} className={'ml-2'}>
               <span>UnFollow</span>
            </Button>
         </div>
      );

      data = (
        <ProfilePost
          posts={posts}
          fetchMoreData={fetchMoreData}
          setPost={setPosts}
          hasMore={hasMore}
        />
      );
   }

   if (friendShipStatus === FriendShipStatus.accept) {
      data = (
         <Col md={12} className={'not_friend text-center p-4'}>
            <h5>To see post</h5>
            <p className={'text-muted mt-3'}>you have to follow Him / Her</p>
            <div className="d-flex justify-content-center">
               <Button className={'mt-3 mx-2'} onClick={onAcceptRequestHandler}>
                  Accept
               </Button>
               <Button className={'mt-3'} onClick={onRejectRequestHandler}>
                  Reject
               </Button>
            </div>
         </Col>
      );
      unFollowBtn = null;
   }

   return (
      <Container>
         {!isLoading && userStats.user ? (
            <Row
               className={
                  'mx-4 my-3 other_profile justify-content-center align-items-center'
               }
            >
               <Col md={12} className={'profile_header text-center py-4 mb-5'}>
                  <ProfileHeader userStats={userStats} otherProfileId={id} />
                  {unFollowBtn}
               </Col>
               {data}
            </Row>
         ) : null}
      </Container>
   );
};

export default OtherProfile;
