import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import Button from '../../../../component/Button/Button';
import * as FaIcon from 'react-icons/fa';

const EditProfile = () => {
   const [value, setValue] = React.useState(new Date());
   const weightOptions = [
      { value: 'lb', label: 'Lbs' },
      { value: 'kg', label: 'Kg' },
   ];
   const heightOptions = [
      { value: 'ft', label: 'Ft' },
   ];

   return (
      <Form className={'setting_form'}>
         <Row>
            <Col md={6} className={'mt-4'}>
               <Form.Label>Name</Form.Label>
               <Form.Control type={'text'} placeholder={'Enter username'} />
            </Col>
            <Col md={6} className={'setting_date'}>
               <Form.Label />

            </Col>
            <Col md={4} className={'mt-4'}>
               <Form.Label>Weight</Form.Label>
               <Form.Control type={'text'} placeholder={'Enter your weight'} />
            </Col>
            <Col md={2} className={'mt-4'}>
               <Form.Label>Unit</Form.Label>
               <Select
                  isSearchable={false}
                  defaultValue={weightOptions[0]}
                  options={weightOptions}
               />
            </Col>
            <Col md={4} className={'mt-4'}>
               <Form.Label>Height</Form.Label>
               <Form.Control type={'text'} placeholder={'Enter your weight'} />
            </Col>
            <Col md={2} className={'mt-4'}>
               <Form.Label>Unit</Form.Label>
               <Select
                  isSearchable={false}
                  defaultValue={heightOptions[0]}
                  options={heightOptions}
               />
            </Col>
            <Col md={12} className={'mt-4 text-right setting_btn'}>
               <Button><FaIcon.FaSave className={'mr-2'} />Save Changes</Button>
            </Col>
         </Row>
      </Form>
   );
};

export default EditProfile;
