import React, { useEffect, useState } from "react";
import './Blog.scss';
import FeaturedBlog from './FeaturedBlog/FeaturedBlog';
import PopularBlog from './PopularBlog/PopularBlog';
import { Col, Row } from 'react-bootstrap';
import { getAllBlogs } from "../../services/api/blog";
import { timeAgo } from "../../helper";
import Loader from "../../component/Loader/Loader";
import blog from "../admin/pages/Blog/Blog";

export interface IBlog {
  id: number,
  title: string,
  text: string,
  feature_image: {
    avatar: string
  },
  created_at: string
}

const Blog = () => {

  const [featuredBlog, setFeaturedBlog] = useState([]);

  const [nonFeaturedBlog, setNonFeaturedBlog] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
     setIsLoading(true)
      getAllBlogs()
        .then((res) => {
          setFeaturedBlog(res.data.featuredBlog)
          setNonFeaturedBlog(res.data.nonFeaturedBlog)
          setIsLoading(false)
        })
   }, [])

   return (
      <Row className={' justify-content-center'}>
         <Col md={10}>
           {
             !isLoading ?
               (
                 <React.Fragment>
                   <div className={'blogs'}>
                     <FeaturedBlog blog={featuredBlog} />
                   </div>

                   <div className={'popular_blogs'}>
                     <PopularBlog blog={nonFeaturedBlog} />
                   </div>
                 </React.Fragment>
               ) : (
                 <div className={"text-center"}>
                   <Loader/>
                 </div>
               )
           }
         </Col>
      </Row>
   );
};

export default Blog;
