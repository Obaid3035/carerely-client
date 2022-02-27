import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillClockCircle } from 'react-icons/ai';
import { BsArrowRightShort } from 'react-icons/bs';
import './BlogDetail.scss';
import BlogDetailImg from '../../../assets/img/blog_detail1.png';
import BlogDetail2 from '../../../assets/img/blog_detail2.png';

const BlogDetail = () => {
   return (
      <Container fluid>
         <Row className={'justify-content-around'}>
            <Col md={7} className={'blog_detail_left'}>
               <img src={BlogDetailImg} alt='blog-detail' />

               <div className='blog_detail_heading'>
                  <h5>Excepteur sint occaeuiecat cupidatat</h5>
                  <p><AiFillClockCircle /> 1 min ago </p>
               </div>

               <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                  desktop
                  publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </p>
               <br />
               <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                  desktop
                  publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </p>

               <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a
                  type specimen book. It has survived not only five centuries,
                  but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                  desktop
                  publishing software like Aldus PageMaker including versions of Lorem Ipsum.
               </p>


            </Col>

            <Col md={4} className={'blog_detail_right'}>

               <div className={'blog_detail_right_details'}>
                  <img src={BlogDetail2} alt='Blog-Detail' />
                  <div className={'blog_detail_description'}>
                     <h5>Excepteur sint occaecat cupidatat </h5>
                     <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                     <div className={'blog_detail_right_time'}>
                        <p><AiFillClockCircle /> 1 min ago </p>
                        <BsArrowRightShort />
                     </div>
                  </div>
               </div>
               <div className={'blog_detail_right_details'}>
                  <img src={BlogDetail2} alt='Blog-Detail' />
                  <div className={'blog_detail_description'}>
                     <h5>Excepteur sint occaecat cupidatat </h5>
                     <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                     <div className={'blog_detail_right_time'}>
                        <p><AiFillClockCircle /> 1 min ago </p>
                        <BsArrowRightShort />
                     </div>
                  </div>
               </div>
               <div className={'blog_detail_right_details'}>
                  <img src={BlogDetail2} alt='Blog-Detail' />
                  <div className={'blog_detail_description'}>
                     <h5>Excepteur sint occaecat cupidatat </h5>
                     <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                     <div className={'blog_detail_right_time'}>
                        <p><AiFillClockCircle /> 1 min ago </p>
                        <BsArrowRightShort />
                     </div>
                  </div>
               </div>

            </Col>

         </Row>
      </Container>
   );
};

export default BlogDetail;
