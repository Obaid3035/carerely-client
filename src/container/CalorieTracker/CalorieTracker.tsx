import React, {useState} from 'react';
import Calorie from '../../assets/img/calorie.png';
import {Button, Col, Container, Row} from 'react-bootstrap';
import './CalorieTracker.scss';
import CalorieFormModal from "./CalorieFormModal/CalorieFormModal";

const CalorieTracker = () => {
   const [show, setShow] = useState(false);

   return (
       <Container>
          <CalorieFormModal show={show} onModalChange={() => setShow(!show)}/>
          <Row className="calorie_tracker">
             <Col md={6} className="calorie_tracker_heading">
                <h1>Calorie tracker</h1>
                <p>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                   Nunc sit amet vestibulum ex, eget ultrices ex. Vestibulum
                   ac velit in metus laoreet volutpat at id risus. Curabitur
                   mattis lobortis vehicula. Nullam eu lobortis purus. In hac
                   habitasse platea dictumst. Proin viverra aliquet nisl vitae
                   auctor. Donec tortor augue, pharetra a efficitur non,
                   tincidunt vitae felis.
                </p>
             </Col>
             <Col md={6}>
                <div className="calorie_tracker_image">
                   <img src={Calorie} alt={'calorie'}/>
                </div>
             </Col>
          </Row>

          <div className="calorie_tracker_button">
             <Button onClick={() => setShow(!show)}>Breakfast</Button>
             <Button>Lunch</Button>
             <Button>Dinner</Button>
          </div>
       </Container>
   );
};
export default CalorieTracker;
