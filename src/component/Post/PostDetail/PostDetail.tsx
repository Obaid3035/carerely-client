import React from 'react';
import * as MdIcon from 'react-icons/md';
import * as AiIcon from 'react-icons/ai';
import { Button, Container, Form } from 'react-bootstrap';
import Avatar from '../../../assets/img/avatar.png';
import PostImage from '../../../assets/img/post_img.png';
import './PostDetail.scss';

const PostDetail = () => {
   return (
      <Container>
         <div className={'activity_feed'}>
            <div className={'activity_feed_post rounded_white_box'}>
               <div className={'activity_feed_user'}>
                  <img alt={'avatar'} width={50} src={Avatar} />
                  <div className={'activity_feed_user_info'}>
                     <h5>John Bravis</h5>
                     <p className={'text-muted'}>
                        <MdIcon.MdLocationOn />
                        New York
                     </p>
                  </div>
               </div>

               <div className={'activity_feed_description'}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget ultrices
                     ex.
                     Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis vehicula.
                     Nullam eu lobortis purus. In hac habitasse platea dictumst.
                     Proin viverra aliquet nisl vitae auctor. Donec tortor augue, pharetra a efficitur non, tincidunt
                     vitae felis.</p>
               </div>

               <div className={'post_detail_img'}>
                  <img alt={'post'} src={PostImage} />
               </div>

               <div className={'d-flex mt-4 align-items-center post_stats'}>
                  <AiIcon.AiFillHeart />
                  <p className={'mx-2 p-0 m-0 text-muted'}>303</p>
                  <MdIcon.MdModeComment className={'ml-4'} />
                  <p className={'mx-2 p-0 m-0 text-muted'}>200</p>
               </div>
               <div className={'post_comment'}>

                  <div className={'comment_form'}>
                     <img width={50} alt={'avatar'} src={Avatar} />
                     <Form className={'create_post_form'}>
                        <Form.Control
                           type='text'
                           placeholder={'Write your comment……'}
                        />
                        <Button>Post</Button>
                     </Form>
                  </div>
                  <hr />

                  {/* -----------------1-------------------*/}
                  <div className={'comment_show'}>
                     <img src={Avatar} alt={'comment_avatar'} />

                     <div className={'comment_detail'}>
                        <h5> John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.</p>
                     </div>

                  </div>
                  <hr />
                  {/* ----------------2-------------*/}
                  <div className={'comment_show'}>
                     <img src={Avatar} alt={'comment_avatar'} />
                     <div className={'comment_detail'}>
                        <h5> John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.</p>
                     </div>
                  </div>
                  <hr />

                  {/* ----------------3-------------*/}
                  <div className={'comment_show'}>
                     <img src={Avatar} alt={'comment_avatar'} />
                     <div className={'comment_detail'}>
                        <h5> John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.</p>
                     </div>
                     <hr />
                  </div>
                  <hr />

                  {/* ----------------4-------------*/}
                  <div className={'comment_show'}>
                     <img src={Avatar} alt={'comment_avatar'} />
                     <div className={'comment_detail'}>
                        <h5> John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.
                        </p>
                     </div>
                  </div>
                  <hr />

                  {/* ----------------5-------------*/}
                  <div className={'comment_show'}>
                     <img src={Avatar} alt={'comment_avatar'} />
                     <div className={'comment_detail'}>
                        <h5> John Mayers <span> 5 Days ago</span></h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex, eget
                           ultrices ex.
                           Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                           vehicula.</p>
                     </div>
                  </div>
                  <hr />


               </div>
            </div>
         </div>
      </Container>
   );
};

export default PostDetail;
