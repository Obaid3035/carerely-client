import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as MdIcon from 'react-icons/md';
import * as AiIcon from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../assets/img/avatar.png';
import { Form } from 'react-bootstrap';
import Button from '../Button/Button';
import './Post.scss';
import { IPost } from '../../services/slices/post';
import Loader from '../Loader/Loader';
import ReadMore from '../ReadMore/ReadMore';


interface IPostPropsInterface {
   hasMore: boolean,
   mockData: IPost[],
   fetchMoreData: () => void;
}

const Post = (props: IPostPropsInterface) => {
   const navigation = useNavigate();

   const onPostClickHandler = (id: number) => {
      navigation(`/other-profile/${id}`);
   };

   const viewAllComments = () => {
      navigation('/post-detail');
   };

   return (
         <InfiniteScroll
            next={props.fetchMoreData}
            hasMore={props.hasMore}
            endMessage={
               <h4 className={'text-center my-3'}>
                  Yay! You have seen it all
               </h4>

            }
            loader={<div className='text-center'>
               <Loader />
            </div>}
            dataLength={props.mockData.length}
         >

            {props.mockData.map((data: IPost, index: any) => (
                <div className={'activity_feed_post rounded_white_box mb-4'} key={index}>
                    <div className={'activity_feed_user'} onClick={() => onPostClickHandler(data.id)}>
                        <img alt={'avatar'} width={50} src={data.user.avatar} />
                        <div className={'activity_feed_user_info'}>
                            <h5>{data.user.name}</h5>
                            <p className={'text-muted d-flex align-items-center'}>
                                <MdIcon.MdLocationOn />
                                {data.user.city}
                            </p>
                        </div>
                    </div>

                    <div className={'activity_feed_description my-3'}>
                        <ReadMore>
                            {data.text}
                        </ReadMore>

                    </div>

                    <div className={'text-center post_img'}>
                        <img width={1000} alt={'post'} src={data.postImg} />
                    </div>

                    <div className={'d-flex mt-4 align-items-center post_stats'}>
                        <AiIcon.AiFillHeart />
                        <p className={'mx-2 p-0 m-0 text-muted'}>303</p>
                        <MdIcon.MdModeComment className={'ml-4'} />
                        <p className={'mx-2 p-0 m-0 text-muted'}>200</p>
                    </div>
                    <div className={'post_comment'}>
                        <div className={'comment_form'}>
                            <img width={50} alt={'avatar'} className={'rounded_image'} src={data.user.avatar} />
                            <Form className={'create_post_form'}>
                                <Form.Control
                                    type='text'
                                    placeholder={'Write your comment……'}
                                />
                                <Button>Post</Button>
                            </Form>
                        </div>
                        <hr />
                        <div className={'comment_show'}>
                            <img src={Avatar} alt={'comment_avatar'} />
                            <div className={'comment_detail'}>
                                <h5> John Mayers <span> 5 Days ago</span></h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex,
                                    eget ultrices ex.
                                    Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                                    vehicula.</p>
                            </div>

                        </div>
                        <hr />
                        <div className={'comment_show'}>
                            <img src={Avatar} alt={'comment_avatar'} />

                            <div className={'comment_detail'}>
                                <h5> John Mayers <span> 5 Days ago</span></h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet vestibulum ex,
                                    eget ultrices ex.
                                    Vestibulum ac velit in metus laoreet volutpat at id risus. Curabitur mattis lobortis
                                    vehicula.</p>
                            </div>
                        </div>
                        <hr />
                        <div className='text-center'>
                            <Button className={'view_all_btn'} onClick={viewAllComments}>View
                                All <AiIcon.AiOutlineArrowDown /></Button>

                        </div>
                    </div>
                </div>
            ))}
         </InfiniteScroll>
   );
};
export default Post;
