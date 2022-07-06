import React from "react";
import Verified from "../../assets/img/verified.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./VerifiedBadge.scss";

const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    <p> Certified Nutritionist</p>
  </Tooltip>
);

const VerifiedBadge = () => {

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 150, hide: 150 }}
      overlay={renderTooltip}>
      <img alt={"verified"} src={Verified} width={30} height={25} />
    </OverlayTrigger>
  );
};

export default VerifiedBadge;
