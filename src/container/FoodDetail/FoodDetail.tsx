import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import Lemon from '../../assets/img/lemon.png';
import './FoodDetail.scss';

interface IFood {
   id: number,
   itemName: string,
   calorie: string
}

const FoodDetail = () => {
   const foodItems = [
      {
         id: 1,
         itemName: 'Food Item',
         calorie: '20',
      },
      {
         id: 2,
         itemName: 'Food Item',
         calorie: '30',
      },
      {
         id: 3,
         itemName: 'Food Item',
         calorie: '40',
      },
      {
         id: 4,
         itemName: 'Food Item',
         calorie: '10',
      },
      {
         id: 5,
         itemName: 'Food Item',
         calorie: '20',
      },
      {
         id: 6,
         itemName: 'Food Item',
         calorie: '70',
      },
   ];

   const [selectedItem, setSelectedItem] = useState<IFood[]>([]);

   const onAddFoodItem = (item: IFood) => {
      const selectedItemClone = selectedItem.concat();
      selectedItemClone.push(item);
      setSelectedItem(selectedItemClone);
   };

   return (
      <Container fluid>
         <Row className={'justify-content-center'}>
            <Col md={8} className='breakfast_details'>
               <h5>Breakfast Details</h5>
               <Form>
                  <Form.Group>
                     <Form.Control className='search_input' type='text' placeholder='Search Items' />
                  </Form.Group>
               </Form>

               <Row className={'mt-4'}>
                  {
                     foodItems.map((item, index) => (
                        <Col md={4} className={'mb-4'} key={index}>
                           <div className='food_items'>
                              <div className={'food_items_stats'}>
                                 <h4>{item.itemName}</h4>
                                 <p>Calorie: {item.calorie}</p>
                              </div>
                              <AiFillPlusCircle onClick={() => onAddFoodItem(item)} />
                           </div>
                        </Col>
                     ))
                  }
               </Row>
            </Col>
            <Col md={3} className={'quick_details'}>
               <h5>Quick Details</h5>
               <hr />
               {
                  selectedItem.length > 0 ?
                     selectedItem.map((item) => (
                        <React.Fragment>
                           <div className={'d-flex justify-content-between align-items-center mt-3'} key={item.id}>
                              <div className={'d-flex align-items-center justify-content-center quick_img'}>
                                 <img src={Lemon} alt={'lemon'} />
                                 <p className={'p-0 m-0 ml-3'}>{item.itemName}</p>
                              </div>
                              <p className={'p-0 m-0'}>{item.calorie} Calories</p>
                           </div>
                           <hr />
                        </React.Fragment>
                     )) :
                     <p className={'text-center'}>Please select food item</p>
               }
               <Button className={'w-100'}>Calculate</Button>
            </Col>
         </Row>
      </Container>
   );
};
export default FoodDetail;
