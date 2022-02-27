import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from '../../../../component/Button/Button';

const ResetEmail = () => {
   return (
      <Form className={'setting_form'}>
         <Row>
            <Col md={7}>
               <Form.Group>
                  <Form.Label>Current Email</Form.Label>
                  <Form.Control type='email' value={'user@example.com'} disabled />
               </Form.Group>
            </Col>
            <Col md={7}>
               <Form.Group className={'mt-3'}>
                  <Form.Label>Enter New Email</Form.Label>
                  <Form.Control type='email' placeholder={'Enter email address'} />
               </Form.Group>
            </Col>
            <Col md={12} className={'mt-4 text-left setting_btn'}>
               <Button>Verify</Button>
            </Col>
         </Row>
      </Form>
   );
};

export default ResetEmail;
