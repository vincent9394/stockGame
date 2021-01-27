import './App.css';
import Login from './Login/Login';
import Registration from './Login/Registration';

import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import { Homepage } from './Homepage';
import Graph from './Graph';
import SelfProfile from './SelfProfile';
import InfoPage from './InfoPage';
function App() {


  return (
    <>
    <Switch>
    <Route path="/" exact={true} ><Redirect to='/homepage' /></Route>
    <Route path="/homepage" component={Homepage} />
    <Route path="/InfoPage" component={InfoPage} />
    <Route path="/graph" component={Graph} />
    <Route path="/selfProfile" component={SelfProfile} />
    <Route path="/login"  component={Login} />
    <Route path="/register"  component={Registration} />
    <Route component={NotFound} />
    </Switch>
  </>
  );
}

export default App;
