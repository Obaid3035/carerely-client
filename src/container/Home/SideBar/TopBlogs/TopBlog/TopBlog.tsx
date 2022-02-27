import React from 'react';
import './TopBlog.scss';
import Button from '../../../../../component/Button/Button';

const TopBlog = () => {
   return (
      <div className={'mt-4'}>
         <h5>Excepteur sint.</h5>
         <p className={'text-muted'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.</p>
         <Button>Read More</Button>
      </div>
   );
};

export default TopBlog;
