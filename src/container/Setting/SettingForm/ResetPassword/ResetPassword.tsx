import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '../../../../component/Button/Button';

const ResetPassword = () => {
   return (
      <Form className={'setting_form'}>
         <Row>
            <Col md={7}>
               <Form.Group>
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type='email' placeholder={'Enter your password'} />
               </Form.Group>
            </Col>
            <Col md={7}>
               <Form.Group className={'mt-3'}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type='email' placeholder={'Enter your new Password'} />
               </Form.Group>
            </Col>
            <Col md={7}>
               <Form.Group className={'mt-3'}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type='email' placeholder={'Enter confirm Password'} />
               </Form.Group>
            </Col>
            <Col md={12} className={'mt-4 text-left setting_btn'}>
               <Button>Submit</Button>
            </Col>
         </Row>
      </Form>
   );
};

export default ResetPassword;
