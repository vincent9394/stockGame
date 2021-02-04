import React from 'react'
import './ActionBar.scss'
import ActionBarButtonSet from './ActionBarButtonSet'
const GraphPageInfo:React.FC=()=> {
    return (
        <div>
            This is the place show a stock Info
           {ActionBarButtonSet({value:1})}
        </div>
    )
}

export default GraphPageInfo
