import React from 'react';
import Avatar from '../../../../../assets/img/avatar.jpg';
import './TopAccount.scss';
import { IUser } from "../../../../../component/Header/Header";
import { useNavigate } from "react-router-dom";

const TopAccount: React.FC<{ topAccounts: IUser[]  }> = ({ topAccounts }) => {
   const navigation = useNavigate()
   return (
      <div className={'top_account_profiles'}>
        {
          topAccounts.map((account) => (
            <div className={'text-center ml-3'} key={account.id}>
              <img width={60} height={60} alt={'profile'}
                   onClick={() => navigation(`/other-profile/${account.id}`)}
                   src={account.image ? account.image.avatar : Avatar}
              />
              <p className={'text-muted mt-2'}>{ account.user_name}</p>
            </div>
          ))
        }

      </div>
   );
};

export default TopAccount;
