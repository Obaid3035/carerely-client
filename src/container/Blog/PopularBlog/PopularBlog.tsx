import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PopularBlogImg from '../../../assets/img/popular_blog.png';


const PopularBlog = () => {
   return (
      <React.Fragment>
         <h5>Popular Blogs</h5>
         <div>
            <Container fluid>
               <Row className={'popular_blogs_row'}>
                  <Col md={4}>
                     <img src={PopularBlogImg} alt={'popular_blog'} />
                  </Col>
                  <Col md={6} className={'popular_blogs_text'}>
                     <h5>Lifestyle, Design</h5>
                     <p>Lorem ipsum dolor sit amet, consect adipiscing elit. Maecenas.</p>
                  </Col>
               </Row>
            </Container>
         </div>
         <div>
            <Container fluid>
               <Row className={'popular_blogs_row'}>
                  <Col md={4}>
                     <img src={PopularBlogImg} alt={'popular_blog'} />
                  </Col>
                  <Col md={6} className={'popular_blogs_text'}>
                     <h5>Lifestyle, Design</h5>
                     <p>Lorem ipsum dolor sit amet, consect adipiscing elit. Maecenas.</p>
                  </Col>
               </Row>
            </Container>
         </div>
         <div>
            <Container fluid>
               <Row className={'popular_blogs_row'}>
                  <Col md={4}>
                     <img src={PopularBlogImg} alt={'popular_blog'} />
                  </Col>
                  <Col md={6} className={'popular_blogs_text'}>
                     <h5>Lifestyle, Design</h5>
                     <p>Lorem ipsum dolor sit amet, consect adipiscing elit. Maecenas.</p>
                  </Col>
               </Row>
            </Container>
         </div>

      </React.Fragment>
   );
};

export default PopularBlog;
