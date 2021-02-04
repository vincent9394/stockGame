import React from 'react'
interface InstructionHistoryProps{  //change props
    value:number,
    Content:{
        id:string,
        name:string
    },
}
function SelfProfileInfoRow(props:InstructionHistoryProps){
    return (
        <div className="ItemRowArrangement">
              <div>{props.Content.name}</div>
              <div>3.4</div>
              <div>3000股</div>
              <div>2020/11/20</div>
            </div>

    )
}

export default SelfProfileInfoRow
