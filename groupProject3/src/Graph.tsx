import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CanvasJSReact from './canvasjs.stock.react';
import { IRootState } from "./store";
//import { IRootState } from "./store";
//var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

 type GraphState={         //mention type of State (add by ricky)
    dataPoints1: {}[], 
    dataPoints2: {}[], 
    dataPoints3: {}[], 
    isLoaded: boolean,
 }

 /*type graphType={
   content:{date:any,stock_symbol:any,open:any,high:any,low:any,close:any,volume_ltc:any,volume_usd:any}[]|null;
 }*/
/*class Graph extends React.Component<{},GraphState> { //graphType
  constructor(props:any) { //:graphType
    super(props);
    this.state = { dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false };
  }
 
  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    fetch("https://canvasjs.com/data/docs/ltcusd2018.json") // getting data by json format (data format below)
      .then(res => res.json())             // {"date": "2018-01-01","open": 227.17,"high": 232.29,"low": 217.66,
      .then(                               //"close": 225.22,"volume_ltc": 246251.23,"volume_usd": 55290393.45}
        (data) => {
          var dps1 = [], dps2 = [], dps3 = [];
          for (var i = 0; i < data.length; i++) {
            dps1.push({
              x: new Date(data[i].date),
              y: [
                Number(data[i].open),
                Number(data[i].high),
                Number(data[i].low),
                Number(data[i].close)
              ]
            });
            dps2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
            dps3.push({x: new Date(data[i].date), y: Number(data[i].close)});
          }
          this.setState({
            isLoaded: true,
            dataPoints1: dps1,
            dataPoints2: dps2,
            dataPoints3: dps3
          });
        }
     )

      //  } 
  }
 
  render() {
    const options = {
      theme: "light2",
      title:{
        text:"React StockChart with Date-Time Axis"
      },
      subtitles: [{
        text: "Price-Volume Trend"
      }],
      charts: [{
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function(e:any) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function(e:any) {
              return "";
            }
          }
        },
        axisY: {
          title: "Litecoin Price",       //y axis of the top part of grph
          prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Price (in USD)",
          yValueFormatString: "$#,###.##",
          type: "candlestick",
          dataPoints : this.state.dataPoints1
        }]
      },{
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          }
        },
        axisY: {
          title: "Volume",
          prefix: "$",
          tickLength: 0
        },
        toolTip: {
          shared: true
        },
        data: [{
          name: "Volume",
          yValueFormatString: "$#,###.##",
          type: "column",
          dataPoints : this.state.dataPoints2
        }]
      }],
      navigator: {
        data: [{
          dataPoints: this.state.dataPoints3
        }],
        slider: {
          minimum: new Date("2021-02-03"),  //customize default slider ratio
          maximum: new Date("2021-02-04")
        }
      }
    };
    const containerProps = {                     //size of the graph
      width: "100%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div className="GraphDiv">
      <div> 
        <div>
          {
            // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
            this.state.isLoaded && 
            <CanvasJSStockChart containerProps={containerProps} options = {options}
             onRef = {ref => this.chart = ref} 
            />
          }
        </div>
      </div>
      </div>
    );
  }
}
export default Graph;            */             



export default function Graph(){
  const [graphState,setGraphState] = useState<GraphState>({ dataPoints1: [], dataPoints2: [], dataPoints3: [], isLoaded: false });
  const SearchContent= useSelector((state:IRootState)=>state.stock.SearchContent);
  useEffect(()=>{
    //
       //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    /*   fetch("https://canvasjs.com/data/docs/ltcusd2018.json") // getting data by json format (data format below)
       .then(res => res.json())             // {"date": "2018-01-01","open": 227.17,"high": 232.29,"low": 217.66,
       .then(                               //"close": 225.22,"volume_ltc": 246251.23,"volume_usd": 55290393.45}
         (data) => {
          /* console.log(this.props.content)
           if(this.props.content!=null){
           const data=this.props.content;*/
           var dps1 = [], dps2 = [], dps3 = [];
           if(SearchContent!=null){
           for (var i = 0; i < SearchContent.length; i++) {
             dps1.push({
               x: new Date(SearchContent[i].date),
               y: [
                 Number(SearchContent[i].open),
                 Number(SearchContent[i].high),
                 Number(SearchContent[i].low),
                 Number(SearchContent[i].close)
               ]
             });
             dps2.push({x: new Date(SearchContent[i].date), y: Number(SearchContent[i].volume_usd)});
             dps3.push({x: new Date(SearchContent[i].date), y: Number(SearchContent[i].close)});
           }
           setGraphState({
             isLoaded: true,
             dataPoints1: dps1,
             dataPoints2: dps2,
             dataPoints3: dps3
           });
          }

       //  } 
  }, [SearchContent]);// [] useEffect , componentDidMount
  const options = {
    theme: "light2",
    title:{
      text:`React StockChart with Date-Time Axis`
    },
    subtitles: [{
      text: "Price-Volume Trend"
    }],
    charts: [{
      axisX: {
        lineThickness: 5,
        tickLength: 0,
        labelFormatter: function(e:any) {
          return "";
        },
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelFormatter: function(e:any) {
            return "";
          }
        }
      },
      axisY: {
        title: "Litecoin Price",       //y axis of the top part of grph
        prefix: "$",
        tickLength: 0
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (in USD)",
        yValueFormatString: "$#,###.##",
        type: "candlestick",
        dataPoints : graphState.dataPoints1
      }]
    },{
      height: 100,
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Volume",
        prefix: "$",
        tickLength: 0
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Volume",
        yValueFormatString: "$#,###.##",
        type: "column",
        dataPoints : graphState.dataPoints2
      }]
    }],
    navigator: {
      data: [{
        dataPoints: graphState.dataPoints3
      }],
      slider: {
        minimum: new Date("2021-01-01"),  //customize default slider ratio
        maximum: new Date("2021-01-01")
      }
    }
  };
  const containerProps = {                     //size of the graph
    width: "90%",
    height: "450px",
    margin: "auto"
  };

  return (
    <div className="GraphDiv">
    <div> 
      <div>
        {
          // Reference: https://reactjs.org/docs/conditional-rendering.html#inline-if-with-logical--operator
          graphState.isLoaded && 
          <CanvasJSStockChart containerProps={containerProps} options = {options}
            /* onRef = {ref => this.chart = ref} */
          />
        }
      </div>
    </div>
    </div>
  );
}