import React, { useState } from 'react';
import './Auth.scss';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as MdIcon from 'react-icons/md';
import * as RiIcon from 'react-icons/ri';
import * as AiIcon from 'react-icons/ai';
import Divider from '../../assets/img/auth-divider.png';
import Logo from '../../assets/img/Combined_Logo.png';
import { AuthValidation } from './AuthValidation';
import { useNavigate } from 'react-router-dom';
import { disableError, userLogin } from '../../services/slices/auth';
import { useAppDispatch, useAppSelector } from '../../services/hook';
import Button from '../../component/Button/Button';
import Loader from '../../component/Loader/Loader';
import { IResponseStatus } from '../../services/store';

interface IAuthInput {
   name?: string;
   email: string;
   password: string;
}

enum AUTH_TOGGLE {
   LOGIN = 'login',
   REGISTER = 'register',
}

const Auth = () => {
   const navigation = useNavigate();
   const dispatch = useAppDispatch();
   const authState = useAppSelector((state) => state.auth);


   const {
      register: signUpRegister,
      handleSubmit: signUpSubmit,
      reset: signUpReset,
      formState: { errors: signUpErrors },
   } = useForm<IAuthInput>();

   const {
      register: loginRegister,
      handleSubmit: loginSubmit,
      reset: loginReset,
      formState: { errors: loginErrors },
   } = useForm<IAuthInput>();


   const [authToggle, setAuthToggle] = useState(AUTH_TOGGLE.LOGIN);

   const onSignUpSubmit = signUpSubmit((data) => {
      console.log(data);
   });

   const onLoginSubmit = loginSubmit((data) => {
      dispatch(userLogin(data))
         .then((res) => {
            if (res.meta.requestStatus === IResponseStatus.FULFILLED) {
               navigation('/home');
            }
         });
   });

   const getErrorInputClass = (field: string) => {
      if (
         signUpErrors.hasOwnProperty(field) ||
         loginErrors.hasOwnProperty(field)
      ) {
         return 'error_input';
      }
   };

   const authToggleHandler = () => {
      if (authToggle === AUTH_TOGGLE.LOGIN) {
         loginReset({
            email: '',
            name: '',
            password: '',
         });
         dispatch(disableError(null));
         setAuthToggle(AUTH_TOGGLE.REGISTER);
      } else if (authToggle === AUTH_TOGGLE.REGISTER) {
         signUpReset({
            email: '',
            name: '',
            password: '',
         });
         dispatch(disableError(null));
         setAuthToggle(AUTH_TOGGLE.LOGIN);
      }
   };

   const registerForm = (
      <React.Fragment>
         <h2>Create Account</h2>
         <Form className='auth_form' onSubmit={onSignUpSubmit}>
            <Form.Group className={'input_container'}>
               <MdIcon.MdPersonOutline className={getErrorInputClass('name')} />
               <Form.Control
                  type='text'
                  placeholder={'Enter Username'}
                  className={getErrorInputClass('name')}
                  {...signUpRegister('name', AuthValidation.name)}
               />
               <p className={'error_input_message'}>{signUpErrors.name?.message}</p>
            </Form.Group>
            <Form.Group className={'input_container'}>
               <RiIcon.RiMailSendLine className={getErrorInputClass('email')} />
               <Form.Control
                  type='email'
                  placeholder={'Enter email address'}
                  className={getErrorInputClass('email')}
                  {...signUpRegister('email', AuthValidation.email)}
               />
               <p className={'error_input_message'}>{signUpErrors.email?.message}</p>
            </Form.Group>
            <Form.Group className={'input_container'}>
               <AiIcon.AiOutlineLock className={getErrorInputClass('password')} />
               <Form.Control
                  type='password'
                  placeholder={'Enter Password'}
                  className={getErrorInputClass('password')}
                  {...signUpRegister('password', AuthValidation.password)}
               />
               <p className={'error_input_message'}>
                  {signUpErrors.password?.message}
               </p>
            </Form.Group>
            <div className={'text-center'}>
               <img alt={'divider'} src={Divider} />
            </div>
            {authState.isLoading ? (
               <Loader />
            ) : (
               <Button className={'mt-3'}>CREATE AN ACCOUNT</Button>
            )}
            <div className='text-center w-100 mt-3'>
               <p className={'auth_switch'}>
                  Already have an account ?{' '}
                  <span onClick={authToggleHandler}>Sign In</span>
               </p>
            </div>
         </Form>
      </React.Fragment>
   );

   const loginForm = (
      <React.Fragment>
         <h2>Log In Account</h2>
         <Form className={'auth_form'} onSubmit={onLoginSubmit}>
            <Form.Group className={'input_container'}>
               <RiIcon.RiMailSendLine className={getErrorInputClass('email')} />
               <Form.Control
                  type='email'
                  placeholder={'Enter email address'}
                  className={getErrorInputClass('email')}
                  {...loginRegister('email', AuthValidation.email)}
               />
               <p className={'error_input_message'}>{loginErrors.email?.message}</p>
            </Form.Group>
            <Form.Group className={'input_container'}>
               <AiIcon.AiOutlineLock className={getErrorInputClass('password')} />
               <Form.Control
                  type='password'
                  placeholder={'Enter Password'}
                  className={getErrorInputClass('password')}
                  {...loginRegister('password', AuthValidation.password)}
               />
               <p className={'error_input_message'}>
                  {loginErrors.password?.message}
               </p>
            </Form.Group>
            <div className={'text-center'}>
               <img alt={'divider'} src={Divider} />
            </div>
            {authState.isLoading ? (
               <Loader />
            ) : (
               <Button className={'mt-3'}>Sign In</Button>
            )}
            <div className='text-center w-100 mt-3'>
               <p className={'auth_switch'}>
                  Not a member ? <span onClick={authToggleHandler}>Sign Up</span>
               </p>
            </div>
         </Form>
      </React.Fragment>
   );

   const authForm = () => {
      if (authToggle === AUTH_TOGGLE.REGISTER) {
         return registerForm;
      } else if (authToggle === AUTH_TOGGLE.LOGIN) {
         return loginForm;
      }
   };


   return (
      <div className={'bg_img'}>
         <div className={'card_view'}>
            <Row className={'h-100'}>
               <Col md={6} className={'left_section'}>
                  <div className={'welcome_carelery text-center'}>
                     <h2>Welcome To</h2>
                     <img alt={'Logo'} src={Logo} />
                     <p>
                        Carerely is an all in one social media platform that provides
                        you with everything you’ll need to get fit & active.
                     </p>
                  </div>
               </Col>
               <Col md={6} className={'right_section'}>
                  {authState.isError ? (
                     <p className={'network_error text-center'}>{authState.error}</p>
                  ) : null}
                  {authForm()}
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default Auth;
