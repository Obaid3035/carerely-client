import React from 'react';
import ProfilePost from '../ProfilePost/ProfilePost';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '../../../component/Button/Button';
import ProfileHeader from '../ProfileHeader/ProfileHeader';


const CurrentProfile = () => {
   return (
      <Container>
         <Row className={'mx-4 my-3 justify-content-center align-items-center'}>
            <Col md={12} className={'profile_header text-center py-4'}>
               <ProfileHeader />
            </Col>
            <div className={'current_profile_form'}>
               <Form className={'create_post_form text-center'}>
                  <Form.Control
                     type='text'
                     placeholder={'Write something in your mind……'}
                  />
                  <Button>Post</Button>
               </Form>
            </div>
            <ProfilePost />
         </Row>

      </Container>
   );
};

export default CurrentProfile;
