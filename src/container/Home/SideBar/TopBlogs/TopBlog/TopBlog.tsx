import React from 'react';
import './TopBlog.scss';
import Button from '../../../../../component/Button/Button';

interface ITopBlog {
  id: number,
  title: string,
  text: string
}
const TopBlog: React.FC<ITopBlog> = ({ id, title, text}) => {
   return (
       <div className={"mt-4"}>
         <h5>{title}</h5>
       <Button onClick={() => window.location.href = `/blog/${id}`}>Read More</Button>
      </div>
   );
};

export default TopBlog;
