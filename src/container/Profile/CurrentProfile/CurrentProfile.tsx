import React, { useEffect, useState } from 'react';
import ProfilePost from '../ProfilePost/ProfilePost';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '../../../component/Button/Button';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import { createPost, currentUserPost, currentUserStats } from "../../../services/api/post";
import Loader from '../../../component/Loader/Loader';
import { useForm } from "react-hook-form";
import { IPostInput } from "../../Home/Feed/Feed";
import FollowerModal from "../FollowerModal/FollowerModal";

const CurrentProfile = () => {
   const [page, setPage] = useState(0);
   const [size, setSize] = useState(3);
   const [hasMore, setHasMore] = useState(true);
   const [posts, setPosts] = useState<any>([]);
   const [postCount, setPostCount] = useState(0);
   const [userStats, setUserStats] = useState<any>({
      currentUserFollowers: 0,
      currentUserFollowings: 0,
      currentUserPostCount: 0,
      user: null,
   });
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      const getUserProfile = async () => {
         const userPromise = currentUserStats();
         const postPromise = currentUserPost(page, size);

         const [user, post] = await Promise.all([userPromise, postPromise]);
         setUserStats({
            currentUserPostCount: user.data.postCount,
            currentUserFollowings: user.data.followingCount,
            currentUserFollowers: user.data.followersCount,
            user: user.data.user,
         });
         setPosts(post.data.posts);
         setPostCount(post.data.count);
         setIsLoading(false);
      };

      getUserProfile().then(() => {});
   }, []);

   const fetchMoreData = () => {
      if (posts.length === postCount) {
         setHasMore(false);
         return;
      }

      currentUserPost(page + 1, size)
         .then((res) => {
            setPage(page + 1);
            setPosts([...posts, ...res.data.posts]);
            setPostCount(res.data.count);
         })
   };

   const {register, handleSubmit, reset} = useForm<IPostInput>();


   const onPostCreate = handleSubmit(async (data) => {
      setIsLoading(true)
      try {
         const formData = new FormData();
         formData.append("text", data.text)
         formData.append("image", data.image[0])
         const post = await createPost(formData);
         setPosts([
            post.data,
            ...posts
         ])
         setUserStats({
            ...userStats,
            currentUserPostCount: userStats.currentUserPostCount + 1,
         });
         setPostCount(postCount + 1)
         reset()
         setIsLoading(false)
      } catch (e) {
         setIsLoading(false)
      }
   })


   return (
      <Container>
         {!isLoading && userStats.user ? (
            <Row
               className={'mx-4 my-3 justify-content-center align-items-center'}
            >
               <Col md={12} className={'profile_header text-center py-4'}>
                  <ProfileHeader userStats={userStats} />
               </Col>

               <React.Fragment>
                  <div className={'current_profile_form'}>
                     <Form className={'create_post_form text-center row'} onSubmit={onPostCreate}>
                        <div className="col-md-12">
                           <Form.Control
                             type="text"
                             {...register("text")}

                             placeholder={'Write something in your mind……'}
                           />
                           <Button>Post</Button>
                        </div>
                        <Form.Control
                          type={"file"}
                          className={"col-md-6"}
                          {...register("image")}
                        />
                     </Form>
                  </div>
                  <ProfilePost
                     setPost={setPosts}
                     posts={posts}
                     hasMore={hasMore}
                     fetchMoreData={fetchMoreData}
                  />
               </React.Fragment>
            </Row>
         ) : (
            <div className="text-center">
               <Loader />
            </div>
         )}
      </Container>
   );
};

export default CurrentProfile;
