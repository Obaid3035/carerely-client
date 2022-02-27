import React, { useEffect } from 'react';
import { Col, Form } from 'react-bootstrap';
import { getPosts, hasMoreToggle } from '../../../services/slices/post';
import { useAppSelector, useAppDispatch } from '../../../services/hook';
import Post from '../../../component/Post/Post';
import Button from '../../../component/Button/Button';
import Loader from '../../../component/Loader/Loader';
import './Feed.scss';

const Feed = () => {
   const currUser = useAppSelector((state) => state.auth.currentUser)!;
   const postState = useAppSelector((state) => state.post);
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getPosts({
         pageNo: postState.pageNo,
         limit: postState.limit,
      }));
   }, []);


   const fetchMoreData = () => {
      if (postState.posts.length >= 4) {
         dispatch(hasMoreToggle(false));
         return;
      }

      dispatch(getPosts({
         pageNo: postState.pageNo + 1,
         limit: postState.limit,
      }));
   };

   let renderPost;
   if (postState.isLoading) {
      renderPost = <Loader />;
   }

   if (postState.isSuccess) {
      renderPost = <Post hasMore={postState.hasMore} mockData={postState.posts} fetchMoreData={fetchMoreData} />;
   }

   return (
      <Col md={7} className={'pl-5'}>
         <div className={'create_post rounded_white_box mb-5'}>
            <img alt='avatar' width={50} src={currUser.avatar} />
            <Form className={'create_post_form'}>
               <Form.Control
                  type='text'
                  placeholder={'Write something in your mind……'}
               />
               <Button>Post</Button>
            </Form>
         </div>
         <div className={'activity_feed'}>
            <h4 className={"mb-4"}>Activity Feed</h4>
            {renderPost}
         </div>

      </Col>
   );
};

export default Feed;
