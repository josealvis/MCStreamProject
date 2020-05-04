import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./helpers/history";
import {TopNav} from "./components/TopNav/TopNav"
import {Settings} from './components/settings/Settings'

import './App.scss';
import { GridContainer } from './components/grid/GridContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history} >
        <TopNav/>
          <Switch>
            <Route path="/grid" render={(props)=><GridContainer {...props}/>}  />
            <Route path="/settings" render={(props)=><Settings {...props}/>}  />
            <Redirect from="*" to="/grid" />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
