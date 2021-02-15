import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal,Button } from 'antd';
import './OrderingModal.scss'
import { ToAddInstructionThunk } from './Stock/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
/*type OrderingModalState={
  loading: boolean,
  visible: boolean,
  PurchaseVolume:string,
  PurchasePrice:string,
  EffectPeriod:string,
}*/

/*export class OrderingModal extends React.Component< transactionAction,OrderingModalState>{
  constructor(props:transactionAction) {
    super(props);
  this.state = {
    loading: false,
    visible: false,
    PurchaseVolume:'',
    PurchasePrice:'',
    EffectPeriod:'',
  };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    console.log(this.state.PurchasePrice)
    console.log(this.state.PurchaseVolume)
    console.log(this.state.EffectPeriod)
    //fetch data at here
    dispatch(ToAddInstructionThunk(this.props.action,parseInt(this.state.PurchasePrice),parseInt(this.state.PurchaseVolume),this.state.EffectPeriod))
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  updatePurchaseVolume(evt:any) {
    this.setState({
      PurchaseVolume: evt.target.value
    });
  }
  updatePurchasePrice(evt:any) {
    this.setState({
      PurchasePrice: evt.target.value
    });
  }
  updateEffectPeriod(value:string) {
    this.setState({
      EffectPeriod:value,
    });
  }
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
          <div>{this.props.AccountBalance}(
            {this.props.action==="BUY"?"-":"+"}
            {!isNaN(parseInt(this.state.PurchasePrice)*parseInt(this.state.PurchaseVolume))&&parseInt(this.state.PurchasePrice)*parseInt(this.state.PurchaseVolume)}
            )</div>
          </div>
          <div className="InfoColumn">
          <div>Targeted Purchase Price</div>
          <input type="text" value={this.state.PurchasePrice} onChange={evt => this.updatePurchasePrice(evt)}></input>
          </div>
          <div className="InfoColumn">
          <div>Targeted Purchase Volume</div>
          <input type="text" value={this.state.PurchaseVolume} onChange={evt => this.updatePurchaseVolume(evt)}></input>
          </div>
          <div className="InfoColumn">
          <div>Order Effect Period</div>
          <div className="optionColumn">
            <div>
          <input type="radio"  id="Today" name="Period" value={this.state.EffectPeriod} onChange={evt =>this.updateEffectPeriod("Today")}/>
          <label htmlFor="Today">Today{this.props.arrayIndex}</label>
          </div>
          <div>
          <input type="radio"  id="Forever" name="Period" value={this.state.EffectPeriod} onChange={evt => this.updateEffectPeriod("Forever")}/>
          <label htmlFor="Forever">Forever{this.props.arrayIndex}</label>
          </div>
          <br/>
          </div>
          </div>

        </Modal>
      </>
    );
  }
}*/
type transactionAction={
  action:"BUY"|"SELL",
  arrayIndex:number,
  AccountBalance:number|null,
 }
export default function OrderingModal(props:transactionAction){


  const [modalState,setModalState] = useState( {
    loading: false,
    visible: false,
    PurchaseVolume:'',
    PurchasePrice:'',
    EffectPeriod:'',
  })
  const showModal = () => {
    setModalState({...modalState,visible:true});
  };
  const AllStockInfoArray= useSelector((state:IRootState)=>state.stock.CurrentStockInfoArray);
  const accountBalance= useSelector((state:IRootState)=>state.login.accountBalance);
  const Portfolio= useSelector((state:IRootState)=>state.stock.Portfolio);
  const dispatch=useDispatch();
  const handleOk = () => {
    setModalState({ ...modalState,loading: true });
    if(props.action==="BUY"){
      if(accountBalance!==null && accountBalance>parseInt(modalState.PurchasePrice)*parseInt(modalState.PurchaseVolume)){
        dispatch(ToAddInstructionThunk(AllStockInfoArray[props.arrayIndex].stock_symbol,props.action,parseInt(modalState.PurchasePrice),parseInt(modalState.PurchaseVolume),modalState.EffectPeriod))
        setTimeout(() => {
          setModalState({...modalState, loading: false, visible: false });
        }, 3000);
      }else{
        console.log("no enough cash")
        setModalState({ ...modalState,loading: false });
      }
    }else if(props.action==="SELL"){
      if(Portfolio!==[]){
        let StockShare;
          for (const StockInfo of Portfolio){
              if(StockInfo.stock_symbol===AllStockInfoArray[props.arrayIndex].stock_symbol){
                StockShare=StockInfo.shares
              }
      }
      if(StockShare!=null && StockShare-parseInt(modalState.PurchaseVolume)>0){
      dispatch(ToAddInstructionThunk(AllStockInfoArray[props.arrayIndex].stock_symbol,props.action,parseInt(modalState.PurchasePrice),parseInt(modalState.PurchaseVolume),modalState.EffectPeriod))
      setTimeout(() => {
        setModalState({...modalState, loading: false, visible: false });
      }, 3000);
      }else{
        console.log("not enough share")
        setModalState({ ...modalState,loading: false });
      }
    }
    //fetch data at here
  }
  };

  const handleCancel = () => {
    setModalState({ ...modalState,visible: false });
  };
  const updatePurchaseVolume=(evt:any)=> {
    setModalState({...modalState,
      PurchaseVolume: evt.target.value
    });
  }
  const updatePurchasePrice=(evt:any)=> {
    setModalState({...modalState,
      PurchasePrice: evt.target.value
    });
  }
  const updateEffectPeriod=(value:string)=> {
    setModalState({...modalState,
      EffectPeriod:value,
    });
  }

  const { visible, loading } = modalState;
  return (
    <>
      <Button type="primary" style={props.action==="BUY"?{backgroundColor:"#40A9FF"}:{backgroundColor:"red"}} onClick={showModal}>
        {props.action}
      </Button>
      <Modal
        visible={visible}
        title={AllStockInfoArray[props.arrayIndex].stock_symbol}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" style={props.action==="BUY"?{backgroundColor:"#40A9FF"}:{backgroundColor:"red"}} loading={loading} onClick={handleOk}>
            {props.action}
          </Button>,
        ]}
      >
        <div className="InfoColumn">
        <div>Account Balance</div>
        <div>{props.AccountBalance}(
          {props.action==="BUY"?"-":"+"}
          {!isNaN(parseInt(modalState.PurchasePrice)*parseInt(modalState.PurchaseVolume))&&parseInt(modalState.PurchasePrice)*parseInt(modalState.PurchaseVolume)}
          )</div>
        </div>
        <div className="InfoColumn">
        <div>Targeted Purchase Price</div>
        <input type="text" value={modalState.PurchasePrice} onChange={evt => updatePurchasePrice(evt)}></input>
        </div>
        <div className="InfoColumn">
        <div>Targeted Purchase Volume</div>
        <input type="text" value={modalState.PurchaseVolume} onChange={evt => updatePurchaseVolume(evt)}></input>
        </div>
        <div className="InfoColumn">
        <div>Order Effect Period</div>
        <div className="optionColumn">
          <div>
        <input type="radio"  id="Today" name="Period" value={modalState.EffectPeriod} onChange={evt =>updateEffectPeriod("Today")}/>
        <label htmlFor="Today">Today</label>
        </div>
        <br/>
        </div>
        </div>

      </Modal>
    </>
  );
  /* <div>
  <input type="radio"  id="Forever" name="Period" value={modalState.EffectPeriod} onChange={evt => updateEffectPeriod("Forever")}/>
  <label htmlFor="Forever">Forever</label>
  </div>*/





}