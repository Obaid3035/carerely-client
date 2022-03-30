import React from 'react';
import PostImg from '../../../../../assets/img/trending_post.png';
import * as AiIcon from 'react-icons/ai';
import * as MdIcon from 'react-icons/md';
import { IPost } from "../../../../../services/slices/post";
import { likePost } from "../../../../../services/api/post";
import { errorNotify } from "../../../../../utils/toast";

interface ITrendingPost {
   onModalChange: () => void;
   post: IPost,
   onLikeHandler: (postId: number) => void
}

const TrendingPost: React.FC<ITrendingPost> = ({ onModalChange, post, onLikeHandler }) => {




   return (
      <div className={'carousel_item px-3'}>
         <span className={'carousel_image_wrapper'}>
            <img alt={'img'} src={post.image && post.image.avatar ? post.image.avatar : PostImg} />
         </span>
         <div className={'carousel_content'}>
            <AiIcon.AiTwotoneCrown />
            <h4 className={'mt-1'}>{ post.user.user_name }</h4>
            <p onClick={onModalChange}>
               { post.text }
            </p>
            <div className={'most_liked_post_comment'}>
               <div className={'d-flex align-items-center'}>
                  <AiIcon.AiFillHeart   className={post.liked ? 'like_post_stats' : ''}
                                        onClick={() => onLikeHandler(post.id)} />
                  <p className={'m-0 ml-2'}>{ post.like_count }</p>
               </div>
               <div className={'d-flex ml-4 align-items-center'}>
                  <MdIcon.MdModeComment />
                  <p className={'m-0 ml-2'}>{ post.comment_count }</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TrendingPost;
