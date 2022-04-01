import React, { useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Select from 'react-select';
import Button from '../../../../component/Button/Button';
import * as FaIcon from 'react-icons/fa';
import { getCurrentUser } from '../../../../helper';
import { getProfile } from '../../../../services/api';
import Loader from '../../../../component/Loader/Loader';

const EditProfile = () => {
   const [value, setValue] = React.useState(new Date());
   const [isProfileSetup, setIsProfileSetup] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);
   const [profile, setProfile] = React.useState({
      height: 0,
      height_unit: '',
      weight: 0,
      weight_unit: '',
      gender: '',
   });
   useEffect(() => {
      setIsProfileSetup(getCurrentUser().profile_setup);
      if (getCurrentUser().profile_setup) {
         setIsLoading(true);
         getProfile().then((res) => {
            setIsLoading(false);
            setProfile(res.data);
         });
      }
   }, []);
   const weightOptions = [
      { value: 'lb', label: 'Lbs' },
      { value: 'kg', label: 'Kg' },
   ];
   const heightOptions = [{ value: 'ft', label: 'Ft' }];

   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setProfile({
         ...profile,
         [name]: value,
      });
   };

   const onFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(profile);
   };

   return (
      <React.Fragment>
         <h4>Personal Information</h4>
         <hr />
         {isProfileSetup ? (
            profile && !isLoading ? (
               <Form className={'setting_form'} onSubmit={onFormSubmit}>
                  <Row>
                     <Col md={4} className={'mt-4'}>
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                           onChange={onChangeHandler}
                           name={'weight'}
                           type={'text'}
                           value={profile.weight}
                           placeholder={'Enter your weight'}
                        />
                     </Col>
                     <Col md={2} className={'mt-4'}>
                        <Form.Label>Unit</Form.Label>
                        <Select
                           isSearchable={false}
                           defaultValue={weightOptions[0]}
                           onChange={(option) =>
                              setProfile({
                                 ...profile,
                                 weight_unit: option!.value,
                              })
                           }
                           options={weightOptions}
                        />
                     </Col>
                     <Col md={4} className={'mt-4'}>
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                           name={'height'}
                           onChange={onChangeHandler}
                           type={'text'}
                           value={profile.height}
                           placeholder={'Enter your weight'}
                        />
                     </Col>
                     <Col md={2} className={'mt-4'}>
                        <Form.Label>Unit</Form.Label>
                        <Select
                           isSearchable={false}
                           defaultValue={heightOptions[0]}
                           options={heightOptions}
                           onChange={(option) =>
                              setProfile({
                                 ...profile,
                                 weight_unit: option!.value,
                              })
                           }
                        />
                     </Col>
                     <Col md={12} className={'mt-4 text-right setting_btn'}>
                        <Button type={'submit'}>
                           <FaIcon.FaSave className={'mr-2'} />
                           Save Changes
                        </Button>
                     </Col>
                  </Row>
               </Form>
            ) : (
               <div className={'text-center'}>
                  <Loader />
               </div>
            )
         ) : (
            <p className={'alert alert-danger'}>Profile is not setup</p>
         )}
      </React.Fragment>
   );
};

export default EditProfile;
