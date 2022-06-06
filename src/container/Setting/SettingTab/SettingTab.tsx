import React from 'react';
import { Col } from 'react-bootstrap';
import Avatar from '../../../assets/img/avatar.png';
import '../Setting.scss';
import { SETTING_OPTIONS } from '../Setting';

interface ISettingTabProps {
   onClick: (value: string) => void;
   selectedTab: string;
}

const SettingTab: React.FC<ISettingTabProps> = ({ onClick, selectedTab }) => {
   const getActiveClass = (option: string) => {
      if (selectedTab === option) {
         return 'active_tab';
      }
   };
   return (
      <Col md={3} className={'rounded_white_box setting_tabs'}>
         <div className={'text-center profile_change'}>
            <img alt={'avatar'} width={120} src={Avatar} />
            <h4>Jen Smith</h4>
            <input
               type="file"
               id="file-input"
               accept="image/png, image/jpeg"
               className="file_input" />
            <label className="file_label" htmlFor="file-input">
               <span>Change Avatar</span>
            </label>
         </div>
         <hr />
         <div className={'tabs'}>
            <p className={getActiveClass(SETTING_OPTIONS.EDIT_PROFILE)}
               onClick={() => onClick(SETTING_OPTIONS.EDIT_PROFILE)}>Edit Profile</p>
            <p className={getActiveClass(SETTING_OPTIONS.RESET_EMAIL)}
               onClick={() => onClick(SETTING_OPTIONS.RESET_EMAIL)}>Change Email address</p>
            <p className={getActiveClass(SETTING_OPTIONS.RESET_PASSWORD)}
               onClick={() => onClick(SETTING_OPTIONS.RESET_PASSWORD)}>Change Password</p>
         </div>
      </Col>
   );
};

export default SettingTab;
