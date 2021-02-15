import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { IRootState } from './store';

const CompanyInfoCollapseBox = (props:any) => {
    const CompanyInfo= useSelector((state:IRootState)=>state.stock.SearchCompanyInfo);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button color="secondary" onClick={toggle} style={{ marginBottom: '1rem' }}>Company Background</Button>
      <Collapse isOpen={isOpen}>
        <Card className="Background">
          <CardBody className="backgroundContent">
         { CompanyInfo[0].background}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

export default CompanyInfoCollapseBox;