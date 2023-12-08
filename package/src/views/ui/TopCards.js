import React from "react";
import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card>
      <CardBody>
        <div className="text-center">
          <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
          <div>
            <small className="text-muted">{props.subtitle}</small>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;
