import React from 'react';
import 'antd/dist/antd.css';
import { Modal,Button } from 'antd';
import './OrderingModal.scss'
type OrderingModalState={
  loading: boolean,
  visible: boolean
}
type transactionAction={
 action:"BUY"|"SELL",
 arrayIndex:number,
}
export class OrderingModal extends React.Component< transactionAction,OrderingModalState>{
  constructor(props:transactionAction) {
    super(props);
  this.state = {
    loading: false,
    visible: false,
  };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    console.log('this is submit')
    //fetch data at here
    //
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <>
        <Button type="primary" style={this.props.action==="BUY"?{backgroundColor:"#40A9FF"}:{backgroundColor:"red"}} onClick={this.showModal}>
          {this.props.action}
        </Button>
        <Modal
          visible={visible}
          title="Order"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Back
            </Button>,
            <Button key="submit" type="primary" style={this.props.action==="BUY"?{backgroundColor:"#40A9FF"}:{backgroundColor:"red"}} loading={loading} onClick={this.handleOk}>
              {this.props.action}
            </Button>,
          ]}
        >
          <div className="InfoColumn">
          <div>Account Balance</div>
          <div>HKD $99.99+{this.props.arrayIndex}</div>
          </div>
          <div className="InfoColumn">
          <div>Targeted Purchase Price</div>
          <input type="text"></input>
          </div>
          <div className="InfoColumn">
          <div>Targeted Purchase Volume</div>
          <input type="text"></input>
          </div>
          <div className="InfoColumn">
          <div>Order Effect Period</div>
          <div className="optionColumn">
            <div>
          <input type="radio"  id="Today" name="Period" value="Today"/>
          <label htmlFor="Today">Today{this.props.arrayIndex}</label>
          </div>
          <div>
          <input type="radio"  id="Forever" name="Period" value="Forever"/>
          <label htmlFor="Forever">Forever{this.props.arrayIndex}</label>
          </div>
          <br/>
          </div>
          </div>

        </Modal>
      </>
    );
  }
}

