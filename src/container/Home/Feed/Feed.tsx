import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import Post from "../../../component/Post/Post";
import Button from "../../../component/Button/Button";
import Loader from "../../../component/Loader/Loader";
import "./Feed.scss";
import { createPost, getFeedPost } from "../../../services/api/post";
import Avatar from "../../../assets/img/avatar.jpg"
import { useForm } from "react-hook-form";
import {FiUpload} from "react-icons/fi";

export interface IPostInput {
   text: string,
   image: [File]
}

const Feed = () => {
   const [page, setPage] = useState(0);
   const [size, setSize] = useState(3);
   const [isLoading, setIsLoading] = useState(false);
   const [hasMore, setHasMore] = useState(true);
   const [posts, setPosts] = useState<any>([]);
   const [postCount, setPostCount] = useState(0);

   const {register, handleSubmit, reset} = useForm<IPostInput>();

   useEffect(() => {
      setIsLoading(true);
      getFeedPost(page, size)
         .then((res) => {
            setIsLoading(false);
            setPosts(res.data.posts);
            setPostCount(res.data.count)
         })
         .catch(() => {
            setIsLoading(false);
         });
   }, []);

   const fetchMoreData = () => {
      if (posts.length === postCount) {
         setHasMore(false);
         return;
      }

      getFeedPost(page + 1, size)
         .then((res) => {
            setPage(page + 1)
            setIsLoading(false);
            setPosts([...posts, ...res.data.posts]);
            setPostCount(res.data.count)
         })
         .catch(() => {
            setIsLoading(false);
         });
   };

   let renderPost;
   if (isLoading) {
      renderPost = <Loader />;
   }

   if (!isLoading) {
      if (posts.length > 0) {
         renderPost = (
            <Post
              setPost={setPosts}
               hasMore={hasMore}
               mockData={posts}
               fetchMoreData={fetchMoreData}
            />
         );
      } else {
         renderPost = <h4 className={"text-center"}>No Post Found</h4>;
      }
   }

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
         setPostCount(postCount + 1)
         reset()
         setIsLoading(false)
      } catch (e) {
         setIsLoading(false)
      }
   })

   return (
      <Col md={7} className={'pl-5'}>
         <div className={'create_post rounded_white_box mb-5'}>
            <img alt='avatar' width={50} src={Avatar} />
            <Form className={'create_post_form'} onSubmit={onPostCreate}>
               <Form.Control
                  type="text"
                  {...register("text")}
                  placeholder={'Write something in your mind……'}
               />
               <Button>Post</Button>
               <div className={'input_file mt-4'}>
                  <input
                    type="file"
                    id="file-input"
                    className="file_input"
                    {...register("image")}
                  />
                  <label className="file_label" htmlFor="file-input">
                     <FiUpload />
                     <span className={"mx-2"}>Add Photo</span>
                  </label
                  >
               </div>
            </Form>
         </div>
         <div className={'activity_feed'}>
            <h4 className={'mb-4'}>Activity Feed</h4>
            {renderPost}
         </div>
      </Col>
   );
};

export default Feed;
