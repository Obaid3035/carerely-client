import React, { useState } from 'react';
import SiteModal, {ISiteModal} from '../../../component/SiteModal/SiteModal';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DateSelect from '../../../component/DatePicker/DatePicker';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import './CalorieFormModal.scss';


enum GENDER {
   MALE = 'male',
   FEMALE = 'female',
   OTHER = 'other',
}

const CalorieFormModal: React.FC<ISiteModal> = ({ show, onModalChange }) => {
   const navigation = useNavigate();

   const [selectGender, setSelectGender] = useState(GENDER.MALE);

   const weightOptions = [
      { value: 'lb', label: 'Lbs' },
      { value: 'kg', label: 'Kg' },
   ];

   const heightOptions = [{ value: 'ft', label: 'Ft' }];

   return (
      <SiteModal show={show} onModalChange={onModalChange}>
         <Form className={'tracker__modal'}>
            <Container fluid>
               <Row>
                  <Col md={12}>
                     <Form.Label>Birthday</Form.Label>
                     <DateSelect />
                  </Col>
                  <Col md={8} className={'modal_col'}>
                     <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                     >
                        <Form.Label>Enter Your Height</Form.Label>
                        <Form.Control type="text" placeholder="5" />
                     </Form.Group>
                  </Col>
                  <Col md={4} className={'unit'}>
                     <Select
                        defaultValue={heightOptions[0]}
                        options={heightOptions}
                     />
                  </Col>
                  <Col md={8} className={'modal_col'}>
                     <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                     >
                        <Form.Label>Enter Your Weight</Form.Label>
                        <Form.Control type="text" placeholder="65" />
                     </Form.Group>
                  </Col>
                  <Col md={4} className={'unit'}>
                     <Select
                        defaultValue={weightOptions[0]}
                        options={weightOptions}
                     />
                  </Col>
                  <Col md={12} className={'modal_col'}>
                     <p>Gender</p>
                     <Form.Check
                        type={'radio'}
                        value={GENDER.MALE}
                        checked={selectGender === GENDER.MALE}
                        onChange={() => setSelectGender(GENDER.MALE)}
                        label={`Male`}
                     />
                     <Form.Check
                        type={'radio'}
                        value={GENDER.FEMALE}
                        checked={selectGender === GENDER.FEMALE}
                        onChange={() => setSelectGender(GENDER.FEMALE)}
                        label={`Female`}
                     />
                     <Form.Check
                        type={'radio'}
                        checked={selectGender === GENDER.OTHER}
                        onChange={() => setSelectGender(GENDER.OTHER)}
                        value={GENDER.OTHER}
                        label={`Others`}
                     />
                  </Col>
                  <Col md={12} className={'tracker__btn'}>
                     <Button onClick={() => navigation('/food-detail')}>
                        Submit
                     </Button>
                  </Col>
               </Row>
            </Container>
         </Form>
      </SiteModal>
   );
};

export default CalorieFormModal;
