import React from 'react'
interface InstructionHistoryProps{  //change props
    value:number,
    Content:{
        id:string,
        name:string
    },
}
function InstructionHistoryRow(props:InstructionHistoryProps) {
    return (
            <div className="ItemRowArrangement">
                  <div>{props.Content.name}</div>
                  <div>買入</div>
                  <div>3.4</div>
                  <div>3000股</div>
                  <div>2020/11/20</div>
                  <div>成功</div>
                </div>
    )
}

export default InstructionHistoryRow
