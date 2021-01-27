import { connectRouter, RouterState,routerMiddleware, CallHistoryMethodAction } from "connected-react-router";
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import { ILoginActions } from "./Login/actions";
import { LoginReducers } from "./Login/reducers";
import { ILoginState } from "./Login/state";
import { createBrowserHistory } from "history";
import thunk,{ThunkDispatch as OldThunkDispatch} from 'redux-thunk';
import { IStockActions } from "./Stock/actions";
import { StockReducers } from "./Stock/reducers";
import { IStockState } from "./Stock/state";
export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>
export const history = createBrowserHistory();



// 1. Combining State by Composition
export interface IRootState{
    login:ILoginState,
    stock:IStockState,
    router: RouterState,
}

// 2. Combining Actions by Union
type IRootAction = ILoginActions |IStockActions| CallHistoryMethodAction;

// 3. Combining Reducers by the function combineReducer()
const rootReducer = combineReducers<IRootState>({
    login:LoginReducers,
    stock:StockReducers,
    router: connectRouter(history),
})

declare global{
  /* tslint:disable:interface-name */
  interface Window{
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any
  }
}
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore<IRootState,IRootAction,{},{}>(rootReducer,composeEnhancers(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(thunk)
));
