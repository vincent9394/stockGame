// import React from 'react';
import logo from './logo.svg';
import './App.css';

import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import h337 from "heatmap.js";

function App() {
  useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      // container : document.querySelector('body') 
      container: document.getElementById('App'),
        maxOpacity: .6,
        radius: 50,
        blur: .90,
        // backgroundColor with alpha so you can see through it
        backgroundColor: 'rgba(0, 0, 58, 0.96)'
    });
    // now generate some random data
var points = [];
var max = 0;
var width = 840;
var height = 400;
var len = 200;

while (len--) {
  var val = Math.floor(Math.random()*100);
  max = Math.max(max, val);
  var point = {
    x: Math.floor(Math.random()*width),
    y: Math.floor(Math.random()*height),
    value: val
  };
  console.log(point);
  points.push(point);
}
// heatmap data format
var data = {
  max: max,
  data: points
};
// if you have a set of datapoints always use setData instead of addData
// for data initialization
heatmapInstance.setData(data);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

