import React from 'react';
import TopBlog from './TopBlog/TopBlog';

const TopBlogs = () => {
   return (
      <div className='top_blog'>
         <h4>Top Blogs</h4>
         <TopBlog />
         <TopBlog />
         <TopBlog />
      </div>
   );
};

export default TopBlogs;
