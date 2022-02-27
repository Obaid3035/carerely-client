import React from 'react';
import PostImg from '../../../../../assets/img/most_liked_post.png';
import * as AiIcon from 'react-icons/ai';
import * as MdIcon from 'react-icons/md';

const TrendingPost = () => {
   return (
      <div className={'carousel_item px-3'}>
         <span className={'carousel_image_wrapper'}>
            <img alt={'img'} src={PostImg} />
         </span>
         <div className={'carousel_content'}>
            <AiIcon.AiTwotoneCrown />
            <h4 className={'mt-1'}>John Smith</h4>
            <h3>Excepteur sint.</h3>
            <p>
               Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
               officia deserunt mollit anim.
            </p>
            <div className={'most_liked_post_comment'}>
               <div className={'d-flex align-items-center'}>
                  <AiIcon.AiFillHeart />
                  <p className={'m-0 ml-2'}>303</p>
               </div>
               <div className={'d-flex ml-4 align-items-center'}>
                  <MdIcon.MdModeComment />
                  <p className={'m-0 ml-2'}>200</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default TrendingPost;
