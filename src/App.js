//import library
import React, { Suspense } from "react";
import { useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import { history } from "./utils/history"
//import components
import UserLoginComponent from './templates/UserLoginTemplate/index'
import Loading from './components/Loading'
import { renderRoutesHome } from './routes'
function App() {
  const loading = useSelector(state => state.loadingReducer.loadStatus);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router history={history}>
        {loading ? <Loading /> : null}
        <Switch>
          {renderRoutesHome()}
          <Route path="/auth" component={UserLoginComponent} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
