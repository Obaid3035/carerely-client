import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { BiRadioCircleMarked, BiRadioCircle } from 'react-icons/bi';
import Button from '../../component/Button/Button';
import { FiClock } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import Avatar from '../../assets/img/avatar.png';
import { AiFillPlusSquare } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import './Queries.scss';
import ReadMore from '../../component/ReadMore/ReadMore';
import QueriesModal from './QueriesModal/QueriesModal';

const Queries = () => {
   const [show, setShow] = useState(false);
   const onClose = () => setShow(!show);


   const options = [
      {
         id: 1,
         name: 'All',
      },
      {
         id: 2,
         name: 'Fitness',
      },
      {
         id: 3,
         name: 'Lifestyle',
      },
      {
         id: 4,
         name: 'Skincare',
      },
      {
         id: 5,
         name: 'Health',
      },
   ];
   const [radioToggle, setRadioToggle] = React.useState(1);

   return (
      <Container fluid>
         <QueriesModal show={show} onClose={onClose} />
         <Row className={'queries_main'}>
            <Col md={3} className={'queries_left'}>
               <ul className={'options'}>
                  {options.map((options, index) => (
                     <li key={index}>
                        {radioToggle === options.id ? (
                           <BiRadioCircleMarked />
                        ) : (
                           <BiRadioCircle onClick={() => setRadioToggle(options.id)} />
                        )}
                        {options.name}
                     </li>
                  ))}
               </ul>
            </Col>
            <Col md={7}>
               <Form>
                  <Form.Group className='ask_question'>
                     <Form.Control
                        className='question_input'
                        type='text'
                        placeholder='Type Your Question Here...'
                     />
                     <AiFillPlusSquare />
                  </Form.Group>
               </Form>

               <div className='question'>
                  <div className={'question_details'}>
                     <div className={'answer_counter'}>9</div>
                     <div className={'ml-3'}>
                        <h5>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                        </h5>
                        <ReadMore>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                           Curabitur cursus urna a augue sollicitudin, non pharetra massa
                           molestie. Ut dictum laoreet urna. Pellentesque venenatis
                           pharetra fermentum. Aliquam ut urna odio. Donec scelerisque
                           suscipit orci, in eleifend felis pharetra faucibus.
                        </ReadMore>
                     </div>
                  </div>
                  <div>
                     <Container>
                        <hr className={'question_divider'} />
                        <Row>
                           <Col md={4}>
                              <div className={'user_details'}>
                                 <img src={Avatar} alt='Avatar' />
                                 <p>
                                    Posted By:{' '}
                                    <NavLink to={'/other-profile/1'}> Jen Smith </NavLink>
                                 </p>
                              </div>
                           </Col>
                           <Col md={2} className={'user_details'}>
                              <FiClock />
                              <p> 10 mins ago</p>
                           </Col>
                           <Col md={2} />

                           <Col md={4} className={'user_details'}>
                              <Button onClick={() => setShow(!show)} className='see_btn'>Answers</Button>
                              <AiOutlineHeart className={'ml-2'} />
                              <p>6,109</p>
                           </Col>
                        </Row>
                     </Container>
                  </div>
               </div>
               <div className='question'>
                  <div className={'question_details'}>
                     <div className={'answer_counter'}>9</div>
                     <div className={'ml-3'}>
                        <h5>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                        </h5>
                        <ReadMore>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                           Curabitur cursus urna a augue sollicitudin, non pharetra massa
                           molestie. Ut dictum laoreet urna. Pellentesque venenatis
                           pharetra fermentum. Aliquam ut urna odio. Donec scelerisque
                           suscipit orci, in eleifend felis pharetra faucibus.
                        </ReadMore>
                     </div>
                  </div>
                  <div>
                     <Container>
                        <hr className={'question_divider'} />
                        <Row>
                           <Col md={4}>
                              <div className={'user_details'}>
                                 <img src={Avatar} alt='Avatar' />
                                 <p>
                                    Posted By:{' '}
                                    <NavLink to={'/other-profile/1'}> Jen Smith </NavLink>
                                 </p>
                              </div>
                           </Col>
                           <Col md={2} className={'user_details'}>
                              <FiClock />
                              <p> 10 mins ago</p>
                           </Col>
                           <Col md={2} />

                           <Col md={4} className={'user_details'}>
                              <Button onClick={() => setShow(!show)} className='see_btn'>Answers</Button>
                              <AiOutlineHeart className={'ml-2'} />
                              <p>6,109</p>
                           </Col>
                        </Row>
                     </Container>
                  </div>
               </div>
            </Col>
         </Row>
      </Container>
   );
};
export default Queries;
