import React from 'react';
import './MessageBox.scss';
import Avatar from '../../../assets/img/avatar.png';

const MessageBox = (props: { extraClasses: string }) => {
   return (
      <div className={`message_box ${props.extraClasses}`}>
         <div className={'message_box_top'}>
            <h4>Messages</h4>
            <span className='badge'>1</span>
         </div>
         <div className={'message_box_item'}>
            <img width={60} alt={'avatar'} src={Avatar} className={'img-fluid'} />
            <div className={'message_box_message'}>
               <h5>John Mayers</h5>
               <p>Lorem ipsum dolor sit amet</p>
            </div>
            <p>3 min ago</p>
         </div>
      </div>
   );
};

export default MessageBox;
