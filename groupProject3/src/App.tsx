import './App.css';
import Login from './User/Login';
import Registration from './User/Registration';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import { Homepage } from './Homepage';
import ShowStockPage from './ShowStockPage';
import SelfProfilePage from './SelfProfilePage';
import OrderingPage from './OrderingPage';
import ShowTheStockBySortingPage from './ShowTheStockBySortingPage';
import SampleNavBar from './SampleNavBar';
import InstructionHistoryPage from './InstructionHistoryPage';
import React, { useEffect } from 'react';
import { PrivateRoute } from './PrivateRoute';
import Heatmap from './Heatmap';
//import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './store';
import { ToLoadAllStockThunk } from './Stock/thunks';

const start = new Date();

async function mouseXY(e: React.MouseEvent<HTMLDivElement, MouseEvent>, username: string | null) {

  // we need preventDefault for the touchmove
  e.preventDefault();
  var x = e.screenX;
  var y = e.screenY;
  let current = new Date()
  let time = (current.getTime() - start.getTime()) / 1000;
  let component = "??"
  // if (e.touches) {
  //     x = e.touches[0].pageX;
  //     y = e.touches[0].pageY;
  // }
  // console.log(" x: " + x + " y: " + y + "  time: " + mouseTime);

  console.log("Begin Date Time " + start + " User: " + username + " x: " + x + " y: " + y + "  time: " + (time) + " component: " + component);
  // heatmap.addData({ x: x, y: y, value: 1 });

}

function App() {
  const username = useSelector((state: IRootState) => state.login.username);
  //1.homepage:landingPage->show basic market Info
  //Navbar--->login/logout,search,switch page
  //2.SelfProfile--->Analyse player profit and loss by chart,show all of the history action of player
  //3.orderingPage----->enable player to buy and sold out the stock---> get in by showPage
  //4.ShowStockPage---->get in by search function,show all the info of specific stock
  //5.ShowTheStockBySortingPage--->Such as watch list,buyIn list
  //6.LoginPage------>LoginFunction
  //7.Register------->Register Function
  /*  useEffect(() => {
      const timer=setInterval(()=>{
          console.log('time')
      },1000)
      return ()=>{
        clearInterval(timer)
      }
    },[])*/
    const dispatch=useDispatch();
                    useEffect(() => {
                      dispatch(ToLoadAllStockThunk())
                      const timer=setInterval(()=>{
                        dispatch(ToLoadAllStockThunk())
                        console.log('Updated Home')
                      },1000*120)
                      return ()=>{
                        clearInterval(timer)
                      }
                    })
  return (
    <div onMouseMove={(e) => {
      mouseXY(e, username);
    }}>
      <>
        <SampleNavBar />
        <Switch>
          <Route path="/" exact={true} ><Redirect to='/homepage' /></Route>
          <Route path="/homepage" component={Homepage} />
          <PrivateRoute path="/ordering" component={OrderingPage} />
          <Route path="/showStockPage" component={ShowStockPage} />
          <PrivateRoute path="/selfProfilePage" component={SelfProfilePage} />
          <PrivateRoute path="/instructionHistory" component={InstructionHistoryPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
          <PrivateRoute path="/showTheStockBySortingPage" component={ShowTheStockBySortingPage} />
          <Route path="/heatmap" component={Heatmap} />
          <Route component={NotFound} />
        </Switch>
      </>
    </div>
  );
}



export default App;
