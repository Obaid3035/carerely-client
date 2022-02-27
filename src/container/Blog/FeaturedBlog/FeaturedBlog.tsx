import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import BlogImg from '../../../assets/img/blog_img.png';

const FeaturedBlog = () => {
   const navigation = useNavigate();

   const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
   };

   return (
      <React.Fragment>
         <div className={'blogs_heading'}>
            <h5>Featured Blogs</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum.</p>
         </div>

         <Slider {...settings} className={'mt-4 blog_slider'}>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} onClick={() => navigation('/blog-detail')} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
            <div className={'blog_detail text-center'}>
               <img src={BlogImg} alt={'blog-img'} />
               <hr className={'w-50 mt-3 mb-3 hr_tag'} />
               <h5>How to Stay Fit
                  While Travelling</h5>
               <p>April 4, 2019</p>
            </div>
         </Slider>
      </React.Fragment>
   );
};

export default FeaturedBlog;
