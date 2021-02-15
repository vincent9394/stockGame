
//  import React,  { useEffect }from 'react'
import React from 'react'
import Graph from './Graph'
import GraphPageInfo from './GraphPageInfo'
// import styles from './Heatmap.module.scss';
//  import h337 from "heatmap.js";
//import { IRootState } from './store'
//import NavBar from './NavBar'
/*function graphProps(state:IRootState){
    return state.stock.SearchContent
   }*/
   const start=new Date();
const Heatmap:React.FC=()=>{
    //  useEffect(() => {
        // var heatmap = h337.create({
        //     // only container is required, the rest will be defaults
        //     container: document.querySelector(".App") ,
        //     // container: document.getElementById('heatmapContainer'),
        //     maxOpacity: 0.6,
        //     radius: 50,
        //     blur: 0.9,
        //     // backgroundColor with alpha so you can see through it
        //     backgroundColor: "rgba(0, 0, 58, 0.96)"
        // });

        // var timeStart = Date.now()
        // timeStartFormat = moment(timeStart).format("YYYY-MM-DD h:mm:ss")
        // console.log(timeStartFormat)
        // var mouseTime;

        // function countTime() {
        //     var timer = setInterval(function() {
        //         mouseTime = Date.now() - timeStart;
        //         mouseTime = moment(mouseTime).format("ss")

        //     }, 1000);
        // }
        // countTime();




        // var heatmapContainer = document.getElementById("root") ;
        // heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
        //     // we need preventDefault for the touchmove
        //     e.preventDefault();
        //     var x = e.layerX;
        //     var y = e.layerY;
        //     if (e.touches) {
        //         x = e.touches[0].pageX;
        //         y = e.touches[0].pageY;
        //     }
        //     // console.log(" x: " + x + " y: " + y + "  time: " + mouseTime);
        //     console.log(" x: " + x + " y: " + y + "  time: ");
        //     heatmap.addData({ x: x, y: y, value: 1 });
        // };


    // });



         //canvasjs   suppose use load specific stock action
    
    return (                       
        <div onMouseMove={(e)=>{
            mouseXY(e);
        }}>                       
               <Graph />               
            <GraphPageInfo/>
        </div>
    )
}
function mouseXY(e:React.MouseEvent<HTMLDivElement, MouseEvent>){
     
        // we need preventDefault for the touchmove
        e.preventDefault();
        var x = e.screenX;
        var y = e.screenY;
        let current=new Date()
        let time = (current.getTime()-start.getTime())/1000;
        let  component = "Heatmap.tsx"
        // if (e.touches) {
        //     x = e.touches[0].pageX;
        //     y = e.touches[0].pageY;
        // }
        // console.log(" x: " + x + " y: " + y + "  time: " + mouseTime);
        console.log(" x: " + x + " y: " + y + "  time: "+(time) + " component: " + component);
        // heatmap.addData({ x: x, y: y, value: 1 });
}
export default Heatmap;






//----------------------------------------------------------------------------------------------------------------











// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import h337 from "heatmap.js";

// import "./styles.css";
// import Moment from 'react-moment'; //https://www.npmjs.com/package/react-moment

// const Heatmap:React.FC=()=>{
//     useEffect(() => {
//         var heatmap = h337.create({
//             // only container is required, the rest will be defaults
//             container: document.querySelector(".App"),
//             // container: document.getElementById('heatmapContainer'),
//             maxOpacity: 0.6,
//             radius: 50,
//             blur: 0.9,
//             // backgroundColor with alpha so you can see through it
//             backgroundColor: "rgba(0, 0, 58, 0.96)"
//         });

//         var timeStart = Date.now()
//         timeStartFormat = moment(timeStart).format("YYYY-MM-DD h:mm:ss")
//         console.log(timeStartFormat)
//         var mouseTime;

//         function countTime() {
//             var timer = setInterval(function() {
//                 mouseTime = Date.now() - timeStart;
//                 mouseTime = moment(mouseTime).format("ss")

//             }, 1000);
//         }
//         countTime();




//         var heatmapContainer = document.getElementById("root") | NULL;
//         heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
//             // we need preventDefault for the touchmove
//             e.preventDefault();
//             var x = e.layerX;
//             var y = e.layerY;
//             if (e.touches) {
//                 x = e.touches[0].pageX;
//                 y = e.touches[0].pageY;
//             }
//             // console.log(" x: " + x + " y: " + y + "  time: " + mouseTime);
//             console.log(" x: " + x + " y: " + y + "  time: ");
//             heatmap.addData({ x: x, y: y, value: 1 });
//         };


//     });
    // const dateToFormat = '1976-04-19T12:59-0500';


//     return ( 
//         <div>
//         helloworld
//             </div>
//         // <
//         // div className = "App" >
//         // <
//         // h1 > Hello CodeSandbox < /h1>    <
//         // h2 > Start editing to see some magic happen! < /h2>

//         // <
//         // Moment > { dateToFormat } < /Moment>    <
//         // /div >
//     );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render( < App / > , rootElement);

// export default Heatmap;


