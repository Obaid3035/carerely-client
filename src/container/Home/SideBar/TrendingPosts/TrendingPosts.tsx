import React from 'react';
import Slider from 'react-slick';
import TrendingPost from './TrendingPost/TrendingPost';
import TrendingPostModal from './TrendingPostModal/TrendingPostModal';
import './TrendingPosts.scss'

const TrendingPosts = () => {
  const [show, setShow] = React.useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onModalChange = () => setShow(!show);
  return (
    <div className={'most_liked_post'}>
      <TrendingPostModal show={show} onModalChange={onModalChange} />
      <h4>Trending</h4>
      <Slider {...settings} className={'mt-4'}>
        <TrendingPost onModalChange={onModalChange} />
        <TrendingPost onModalChange={onModalChange} />
        <TrendingPost onModalChange={onModalChange} />
        <TrendingPost onModalChange={onModalChange} />
      </Slider>
    </div>
  );
};

export default TrendingPosts;
