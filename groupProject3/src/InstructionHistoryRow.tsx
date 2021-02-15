import React from 'react'
interface InstructionHistoryProps{  //change props
    value:number,
    Content:{
        id:string,
        user_id:number,
        stock_symbol:string,
        transaction_type_id:number,
        transaction_status_id:number,
        price:number,
        shares:number,
        exp_datetime:string,
    },
}
function InstructionHistoryRow(props:InstructionHistoryProps) {
    let status;
 if(props.Content.transaction_status_id===1){
     status="失敗"
 }else if(props.Content.transaction_status_id===3){
    status="成功"
 }else if(props.Content.transaction_status_id===2){
     status="正在執行"
 }

    return (
            <div className="ItemRowArrangement">
                  <div>{props.Content.stock_symbol}</div>
                  <div>{props.Content.transaction_type_id===1?"買入":"賣出"}</div>
                  <div>{props.Content.price}</div>
                  <div>{props.Content.shares}股</div>
                  <div>{new Intl.DateTimeFormat('default',
                  {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
  timeZone: 'HongKong'
}).format(new Date(props.Content.exp_datetime))}</div>
                  <div>{status}</div>
                </div>
    )
}

export default InstructionHistoryRow
