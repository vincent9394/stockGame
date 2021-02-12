import { Popover, Button } from 'antd';
import React, { useState } from 'react';

 const PopoverElement:React.FC=()=>{
  const [PopoverState,setPopoverState] = useState({visible: false});
  //const SearchContent= useSelector((state:IRootState)=>state.stock.SearchContent);


  const hide = () => {
    setPopoverState({
      visible: false,
    });
  };

  const handleVisibleChange = (visible: any) => {
    setPopoverState({ visible });
  };

    return (
      <Popover
        content={<div onClick={hide}>Close</div>}
        title="Title"
        trigger="click"
        visible={PopoverState.visible}
        onVisibleChange={handleVisibleChange}
      >
        <Button type="primary">Click me</Button>
      </Popover>
    );
}
export default PopoverElement