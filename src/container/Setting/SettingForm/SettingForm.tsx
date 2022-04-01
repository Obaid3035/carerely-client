import React, { useEffect } from "react";
import { Col } from 'react-bootstrap';
import { getCurrentUser } from "../../../helper";

interface ISettingForm {
   form: JSX.Element;
}

const SettingForm: React.FC<ISettingForm> = ({ form }) => {
   return (
      <Col md={8} className={'personal_information rounded_white_box ml-4'}>
         {form}
      </Col>
   );
};

export default SettingForm;
