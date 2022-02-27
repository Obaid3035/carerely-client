import React from 'react';
import Slider from 'react-slick';
import TrendingPost from './TrendingPost/TrendingPost';
import TrendingPostModal from "./TrendingPostModal/TrendingPostModal";

const TrendingPosts = () => {
   const [show, setShow] = React.useState(false);
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
   };
   return (
      <div className={'most_liked_post'}>
         <TrendingPostModal show={show} onModalChange={() => setShow(!show)} />
         <h4 onClick={() => setShow(!show)}>Trending</h4>
         <Slider {...settings} className={'mt-4'}>
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
            <TrendingPost />
         </Slider>
      </div>
   );
};

export default TrendingPosts;
