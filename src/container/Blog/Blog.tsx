import React from 'react';
import './Blog.scss';
import FeaturedBlog from './FeaturedBlog/FeaturedBlog';
import PopularBlog from './PopularBlog/PopularBlog';
import { Col, Row } from 'react-bootstrap';

const Blog = () => {
   return (
      <Row className={' justify-content-center'}>
         <Col md={10}>
            <div className={'blogs'}>
               <FeaturedBlog />
            </div>

            <div className={'popular_blogs'}>
               <PopularBlog />
            </div>
         </Col>
      </Row>
   );
};

export default Blog;
