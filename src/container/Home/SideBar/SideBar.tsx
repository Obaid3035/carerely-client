import React  from 'react';
import { Col } from 'react-bootstrap';
import './SideBar.scss';
import TrendingPosts from './TrendingPosts/TrendingPosts';
import TopBlogs from './TopBlogs/TopBlogs';
import TopAccounts from './TopAccounts/TopAccounts';

const SideBar = () => {

   return (
      <Col md={3} className={'left_home_section rounded_white_box'}>
         <TrendingPosts />
         <TopBlogs />
         <TopAccounts />
      </Col>
   );
};

export default SideBar;
