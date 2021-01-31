import './App.css';
import Login from './Login/Login';
import Registration from './Login/Registration';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import { Homepage } from './Homepage';
import ShowStockPage from './ShowStockPage';
import SelfProfilePage from './SelfProfilePage';
import OrderingPage from './OrderingPage';
import ShowTheStockBySortingPage from './ShowTheStockBySortingPage';
import SampleNavBar from './SampleNavBar';
function App() {    //1.homepage:landingPage->show basic market Info
                    //Navbar--->login/logout,search,switch page
                    //2.SelfProfile--->Analyse player profit and loss by chart,show all of the history action of player
                    //3.orderingPage----->enable player to buy and sold out the stock---> get in by showPage
                    //4.ShowStockPage---->get in by search function,show all the info of specific stock
                    //5.ShowTheStockBySortingPage--->Such as watch list,buyIn list
                    //6.LoginPage------>LoginFunction
                    //7.Register------->Register Function

  return (
    <>
    <SampleNavBar/>
    <Switch>
    <Route path="/" exact={true} ><Redirect to='/homepage' /></Route>
    <Route path="/homepage" component={Homepage} />
    <Route path="/ordering" component={OrderingPage} />
    <Route path="/showStockPage" component={ShowStockPage} />
    <Route path="/selfProfilePage" component={SelfProfilePage} />
    <Route path="/login"  component={Login} />
    <Route path="/register"  component={Registration} />
    <Route path="/showTheStockBySortingPage"  component={ShowTheStockBySortingPage} />
    <Route component={NotFound} />
    </Switch>
  </>
  );
}

export default App;
