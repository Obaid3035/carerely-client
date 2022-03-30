import React, { useEffect, useState } from 'react';
import * as MdIcon from 'react-icons/md';
import * as AiIcon from 'react-icons/ai';
import { Button, Container, Form } from 'react-bootstrap';
import Avatar from '../../../assets/img/avatar.jpg';
import { useParams } from 'react-router-dom';
import './PostDetail.scss';
import {
   createComment,
   getPostById,
   likePost,
} from '../../../services/api/post';
import Loader from '../../Loader/Loader';
import { IPost } from '../../../services/slices/post';
import Comment from '../../Comment/Comment';
import { errorNotify } from '../../../utils/toast';

const PostDetail = () => {
   const { id } = useParams();
   const [isLoading, setIsLoading] = useState(false);
   const [post, setPost] = useState<IPost | null>(null);
   const [text, setText] = useState('');

   useEffect(() => {
      setIsLoading(false);
      getPostById(id!).then((res) => {
         setIsLoading(true);
         setPost(res.data);
      });
   }, []);

   const onLikeHandler = async (postId: number) => {
      if (post) {
         try {
            const postClone = {
               ...post,
            };
            postClone.liked = !postClone.liked;

            if (postClone.liked) {
               postClone.like_count += 1;
            } else {
               postClone.like_count -= 1;
            }
            setPost(postClone);
            await likePost(postId);
         } catch (e) {
            errorNotify('Something went wrong');
         }
      }
   };

   const onCommentCreate = async (e: React.FormEvent, postId: number) => {
      e.preventDefault();
      if (post) {
         try {
            const postClone: any = {
               ...post,
            };
            const comment = await createComment({ text }, postId);

            postClone.comment.push(comment.data);
            postClone.comment_count+=1

            setPost(postClone);
            setText('');
         } catch (e) {
            errorNotify('Something went wrong');
         }
      }
   };

   return (
      <Container>
         {isLoading && post ? (
            <div className={'activity_feed'}>
               <div className={'activity_feed_post rounded_white_box'}>
                  <div className={'activity_feed_user'}>
                     <img
                        alt={'avatar'}
                        width={50}
                        src={post.user.avatar ? post.user.avatar : Avatar}
                     />
                     <div className={'activity_feed_user_info'}>
                        <h5>{post.user.user_name}</h5>
                        {/*<p className={'text-muted'}>*/}
                        {/*   <MdIcon.MdLocationOn />*/}
                        {/*   New York*/}
                        {/*</p>*/}
                     </div>
                  </div>

                  <div className={'activity_feed_description'}>
                     <p>{post.text}</p>
                  </div>

                  {post.image ? (
                     <div className={'post_detail_img'}>
                        <img alt={'post'} src={post.image.avatar} />
                     </div>
                  ) : null}

                  <div className={'d-flex mt-4 align-items-center post_stats'}>
                     <AiIcon.AiFillHeart
                        className={post.liked ? 'like_post_stats' : ''}
                        onClick={() => onLikeHandler(post?.id)}
                     />
                     <p className={'mx-2 p-0 m-0 text-muted'}>
                        {post.like_count}
                     </p>
                     <MdIcon.MdModeComment className={'ml-4'} />
                     <p className={'mx-2 p-0 m-0 text-muted'}>
                        {post.comment_count}
                     </p>
                  </div>
                  <div className={'post_comment'}>
                     <div className={'comment_form'}>
                        <img
                           width={50}
                           alt={'avatar'}
                           src={post.user.avatar ? post.user.avatar : Avatar}
                        />
                        <Form
                           className={'create_post_form'}
                           onSubmit={(e) => onCommentCreate(e, post?.id)}
                        >
                           <Form.Control
                              type="text"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              placeholder={'Write your comment……'}
                           />
                           <Button type={'submit'}>Post</Button>
                        </Form>
                     </div>
                     {post.comment.length > 0 ? (
                        post.comment.map((comment) => (
                           <Comment created_at={comment.created_at} text={comment.text} user={comment.user} />
                        ))
                     ) : (
                        <h4 className={'text-center'}>No Comment Found</h4>
                     )}
                  </div>
               </div>
            </div>
         ) : (
            <Loader />
         )}
      </Container>
   );
};

export default PostDetail;
