import React from 'react';
import Avatar from '../../../../../assets/img/avatar.png';
import './TopAccount.scss';

const TopAccount = () => {
   return (
      <div className={'top_account_profiles'}>
         <div className={'text-center ml-3'}>
            <img width={60} alt={'profile'} src={Avatar} />
            <p className={'text-muted mt-2'}>Mark Damon</p>
         </div>
         <div className={'text-center ml-3'}>
            <img width={60} alt={'profile'} src={Avatar} />
            <p className={'text-muted mt-2'}>Mark Damon</p>
         </div>
         <div className={'text-center ml-3'}>
            <img width={60} alt={'profile'} src={Avatar} />
            <p className={'text-muted mt-2'}>Mark Damon</p>
         </div>
         <div className={'text-center ml-3'}>
            <img width={60} alt={'profile'} src={Avatar} />
            <p className={'text-muted mt-2'}>Mark Damon</p>
         </div>
      </div>
   );
};

export default TopAccount;
