import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as MdIcon from 'react-icons/md';
import * as AiIcon from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from '../Button/Button';
import './Post.scss';
import { IUser } from "../Header/Header";
import Loader from '../Loader/Loader';
import ReadMore from '../ReadMore/ReadMore';
import Avatar from '../../assets/img/avatar.jpg';
import { createComment, deleteComment, deletePost, likePost } from "../../services/api/post";
import { errorNotify } from '../../utils/toast';
import Comment, { IComment } from "../Comment/Comment";
import { getCurrentUser } from '../../utils/helper';
import { useAppSelector } from "../../services/hook";
import Verified from "../../assets/img/verified.png"

interface IPostPropsInterface {
   hasMore: boolean;
   mockData: IPost[];
   fetchMoreData: () => void;
   setPost: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export interface IPost {
   id: number
   user: IUser,
   image: {
      avatar: string
   },
   text: string,
   like_count: number,
   comment_count: number,
   liked: boolean,
   comment: IComment[] | []
}




const Post = (props: IPostPropsInterface) => {
   const navigation = useNavigate();
   const socket = useAppSelector((state) => state.notification.socket)
   const [text, setText] = useState('');

   const onPostClickHandler = (id: number, user_id: number) => {
      const currUser: IUser = getCurrentUser();
      if (currUser.id === user_id) {
         navigation(`/profile`);
      } else {
         navigation(`/other-profile/${user_id}`);
      }
   };

   const onLikeHandler = async (postId: number) => {
      try {
         const post = props.mockData.concat();
         const likedPost = post.findIndex((post) => post.id === postId);
         post[likedPost].liked = !post[likedPost].liked;
         if (post[likedPost].liked) {
            post[likedPost].like_count += 1;
         } else {
            post[likedPost].like_count -= 1;
         }
         props.setPost(post);
         const liked = await likePost(postId);
         socket.emit("send notification", liked.data.notification)
      } catch (e) {
         errorNotify('Something went wrong');
      }
   };

   const onCommentDeleteHandler = async (commentId: number, postId: number) => {
      const post = props.mockData.concat();
      await deleteComment(commentId)
      const commentedPost = post.findIndex((post) => post.id === postId);
      const comment = post[commentedPost].comment.findIndex(
         (comment) => comment.id === commentId
      );
      post[commentedPost].comment.splice(comment, 1);
      props.setPost(post);
   };

   const onCommentCreate = async (e: React.FormEvent, postId: number) => {
      e.preventDefault();
      try {
         const post: any = props.mockData.concat();
         const comment = await createComment({ text }, postId);
         const commentedPost: any = post.findIndex(
            (post: any) => post.id === postId
         );
         if (post[commentedPost].comment.length >= 2) {
            post[commentedPost].comment.pop();
         }
         post[commentedPost].comment.unshift(comment.data.comment);
         post[commentedPost].comment_count += 1;


         props.setPost(post);
         setText('');
         socket.emit("send notification", comment.data.notification)
      } catch (e) {
         errorNotify('Something went wrong');
      }
   };

   const onPostDeleteHandler = async (postId: number) => {
      const post: any = props.mockData.concat();
      await deletePost(postId);
      const foundIndex = post.findIndex((post: any) => post.id === postId);
      post.splice(foundIndex, 1);
      props.setPost(post);
   };

   return (
      <InfiniteScroll
         next={props.fetchMoreData}
         hasMore={props.hasMore}
         endMessage={
            <h4 className={'text-center my-3'}>Yay! You have seen it all</h4>
         }
         loader={
            <div className="text-center">
               <Loader />
            </div>
         }
         dataLength={props.mockData.length}
      >
         {props.mockData.map((data: IPost, index: any) => (
            <div
               className={'activity_feed_post rounded_white_box mb-4'}
               key={index}
            >
               <div className={'activity_feed_user'}>
                  <div
                     className={'d-flex align-items-center'}
                     onClick={() => onPostClickHandler(data.id, data.user.id)}
                  >
                     <img
                        alt={'avatar'}
                        width={50}
                        height={50}
                        src={data.user.image ? data.user.image.avatar : Avatar}
                     />
                     <div className={'activity_feed_user_info'}>
                        <h5>{data.user.user_name}
                           {
                              data.user.is_verified ?
                                <img alt={"verified"} src={Verified} width={30} height={25} />
                                : null
                           }
                        </h5>
                     </div>
                  </div>
                  {
                     getCurrentUser().id == data.user.id ? (
                       <RiDeleteBin6Line
                         onClick={() => onPostDeleteHandler(data.id)}
                         className={'delete'}
                       />
                     ) : null
                  }
               </div>

               <div className={'activity_feed_description my-3'}>
                  <ReadMore>{data.text}</ReadMore>
               </div>

               {data.image ? (
                  <div className={'text-center post_img'}>
                     <img width={1000} alt={'post'} src={data.image.avatar} />
                  </div>
               ) : null}

               <div className={'d-flex mt-4 align-items-center post_stats'}>
                  <AiIcon.AiFillHeart
                     className={data.liked ? 'like_post_stats' : ''}
                     onClick={() => onLikeHandler(data.id)}
                  />
                  <p className={'mx-2 p-0 m-0 text-muted'}>{data.like_count}</p>
                  <MdIcon.MdModeComment className={'ml-4'} />
                  <p className={'mx-2 p-0 m-0 text-muted'}>
                     {data.comment_count}
                  </p>
               </div>
               <div className={'post_comment'}>
                  <div className={'comment_form'}>
                     <img
                        width={50}
                        height={50}
                        alt={'avatar'}
                        className={'rounded_image'}
                        src={data.user.image ? data.user.image.avatar : Avatar}
                     />
                     <Form
                        className={'create_post_form'}
                        onSubmit={(e) => onCommentCreate(e, data.id)}
                     >
                        <Form.Control
                           type="text"
                           name={`text${data.id}`}
                           value={text}
                           onChange={(e) => {
                              setText(e.target.value);
                           }}
                           placeholder={'Write your comment……'}
                        />
                        <Button type={'submit'}>Post</Button>
                     </Form>
                  </div>
                  {data.comment.length > 0 ? (
                     data.comment.map((comment) => (
                        <Comment
                           onCommentDeleteHandler={onCommentDeleteHandler}
                           postId={data.id}
                           id={comment.id}
                           created_at={comment.created_at}
                           text={comment.text}
                           user={comment.user}
                        />
                     ))
                  ) : (
                     <h4 className={'text-center'}>No Comment Found</h4>
                  )}
                  <div className="text-center">
                     <Button
                        className={'view_all_btn'}
                        onClick={() => navigation(`/post-detail/${data.id}`)}
                     >
                        View All <AiIcon.AiOutlineArrowDown />
                     </Button>
                  </div>
               </div>
            </div>
         ))}
      </InfiniteScroll>
   );
};
export default Post;
