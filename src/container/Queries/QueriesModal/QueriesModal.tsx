import React from 'react';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import Avatar from '../../../assets/img/avatar.png';
import { BsFillFileEarmarkMinusFill } from 'react-icons/bs';
import './QueriesModal.scss';

interface IQueriesModal {
   show: boolean,
   onClose: () => void
}

const QueriesModal: React.FC<IQueriesModal> = ({ show, onClose }) => {
   return (
      <Modal show={show} size='lg' className={'query_modal'}>
         <Modal.Body>
            <div className='modal_main'>
               <h2> Answers </h2>
               <p onClick={onClose} title='Close'>X</p>
            </div>
            <hr />

            <div className={'answer_modal'}>
               <img src={Avatar} alt='Avatar' />
               <p>Posted By: <span> Jen Smith </span></p>
            </div>
            <div className={'modal_question'}>
               <p>Pellentesque venenatis pharetra fermentum?</p>
               <div className={'answer_count'}>
                  <BsFillFileEarmarkMinusFill />
                  <p>120</p>
               </div>
            </div>
            <div className={'modal_question_answer'}>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur cursus urna a augue sollicitudin, non pharetra massa molestie.
                  Ut dictum laoreet urna. Pellentesque venenatis pharetra fermentum.
                  Aliquam ut urna odio. Donec scelerisque suscipit orci, in eleifend felis pharetra faucibus.
               </p>
            </div>
            <div>
               <Form>
                  <Form.Group className={'form_answer'}>
                     <Form.Control className='give_answer' type='text' placeholder='Write your Comment' />
                  </Form.Group>
               </Form>
            </div>

            <div className={'show_all_answers'}>
               <Container fluid className={'show_all_answers_container'}>
                  <Row className={'align-items-center'}>
                     <Col md={1} className={'show_all_answers_img'}>
                        <img src={Avatar} alt={'i'} />
                     </Col>
                     <Col md={11} className={'show_all_answers_text'}>
                        <h5>John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex. Vestibulum ac velit in metus laoreet
                           volutpat at id risus.</p>
                     </Col>
                     <hr />

                     <Col md={1} className={'show_all_answers_img'}>
                        <img src={Avatar} alt={'i'} />
                     </Col>
                     <Col md={11} className={'show_all_answers_text'}>
                        <h5>John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex. Vestibulum ac velit in metus laoreet
                           volutpat at id risus.</p>
                     </Col>

                  </Row>

               </Container>
            </div>
         </Modal.Body>
      </Modal>
   );
};

export default QueriesModal;
