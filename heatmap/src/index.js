import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import h337 from "heatmap.js";

import "./styles.css";
// import Moment from 'react-moment';           //https://www.npmjs.com/package/react-moment

function App() {
    useEffect(() => {
        var heatmap = h337.create({
            // only container is required, the rest will be defaults
            container: document.querySelector(".App"),
            // container: document.getElementById('heatmapContainer'),
            maxOpacity: 0.6,
            radius: 50,
            blur: 0.9,
            // backgroundColor with alpha so you can see through it
            backgroundColor: "rgba(0, 0, 58, 0.96)"
        });

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




        var heatmapContainer = document.getElementById("root");
        heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
            // we need preventDefault for the touchmove
            e.preventDefault();
            var x = e.layerX;
            var y = e.layerY;
            if (e.touches) {
                x = e.touches[0].pageX;
                y = e.touches[0].pageY;
            }
            // console.log(" x: " + x + " y: " + y + "  time: " + mouseTime);
            console.log(" x: " + x + " y: " + y + "  time: ");
            heatmap.addData({ x: x, y: y, value: 1 });
        };


    });

    return ( <
        div className = "App" >
        <
        h1 > Hello CodeSandbox < /h1> <
        h2 > Start editing to see some magic happen! < /h2> < /
        div >
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render( < App / > , rootElement);