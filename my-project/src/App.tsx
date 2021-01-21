import './App.css';
import Login from './Login';
import Registration from './Registration';

import { Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import { Homepage } from './Homepage';
function App() {


  return (
    <>
    <Switch>
    <Route path="/" exact={true} ><Redirect to='/homepage' /></Route>
    <Route path="/homepage" component={Homepage} />
    <Route path="/login"  component={Login} />
    <Route path="/register"  component={Registration} />
    <Route component={NotFound} />
    </Switch>
  </>
  );
}

export default App;
