import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import h337 from "heatmap.js";

import "./styles.css";

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
    var heatmapContainer = document.getElementById('root');
    heatmapContainer.onmousemove = heatmapContainer.ontouchmove = function(e) {
      // we need preventDefault for the touchmove
      e.preventDefault();
      var x = e.layerX;
      var y = e.layerY;
      if (e.touches) {
          x = e.touches[0].pageX;
          y = e.touches[0].pageY;
      }
      console.log(" x: " + x + " y: " + y + "  time: " )
      heatmap.addData({ x: x, y: y, value: 1 });

  };

    // now generate some random data
    // var points = [];
    // var max = 0;
    // var width = 840;
    // var height = 400;
    // var len = 200;

    // while (len--) {
    //   var val = Math.floor(Math.random()*100);
    //   max = Math.max(max, val);
    //   var point = {
    //     x: Math.floor(Math.random()*width),
    //     y: Math.floor(Math.random()*height),
    //     value: val
    //   };
    //   console.log(point);
    //   points.push(point);
    // }

    // // heatmap data format
    // var data = {
    //   max: max,
    //   data: points
    // };
    // // if you have a set of datapoints always use setData instead of addData
    // // for data initialization
    // heatmapInstance.setData(data);
  });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
