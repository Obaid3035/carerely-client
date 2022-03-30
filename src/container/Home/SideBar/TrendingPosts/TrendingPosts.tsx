import React, { useEffect } from 'react';
import Slider from 'react-slick';
import TrendingPost from './TrendingPost/TrendingPost';
import TrendingPostModal from './TrendingPostModal/TrendingPostModal';
import './TrendingPosts.scss';
import { getTrendingPosts, likePost } from "../../../../services/api/post";
import Loader from '../../../../component/Loader/Loader';
import { errorNotify } from "../../../../utils/toast";
import { IPost } from "../../../../services/slices/post";

const TrendingPosts = () => {
   const [show, setShow] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);
   const [trendingPost, setTrendingPost] = React.useState<IPost[]>([]);
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   };

   useEffect(() => {
      setIsLoading(true);
      getTrendingPosts().then((res) => {
         setIsLoading(false);
         setTrendingPost(res.data);
      });
   }, []);

   const onLikeHandler = async (postId: number) => {
      try {
         const post = trendingPost.concat();
         const likedPost = post.findIndex((post) => post.id === postId);
         console.log(post[likedPost])
         post[likedPost].liked = !post[likedPost].liked;
         if (post[likedPost].liked) {
            post[likedPost].like_count += 1;
         } else {
            post[likedPost].like_count -= 1;
         }
         setTrendingPost(post);
         await likePost(postId);
      } catch (e) {
         errorNotify('Something went wrong');
      }
   };

   const onModalChange = () => setShow(!show);
   return (
      <div className={'most_liked_post'}>
         <TrendingPostModal show={show} onModalChange={onModalChange} />
         <h4>Trending</h4>
         {!isLoading ? (
            trendingPost.length > 0 ?
              (
                <Slider {...settings} className={'mt-4'}>
                  {
                    trendingPost.map((post) => (
                      <TrendingPost onLikeHandler={onLikeHandler} post={post} onModalChange={onModalChange} />
                    ))
                  }
                </Slider>
              ) : (
                <div className="text-center">
                  <p>No Post Found</p>
                </div>
              )
         ) : (
            <div className="text-center">
               <Loader />
            </div>
         )}
      </div>
   );
};

export default TrendingPosts;
