import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { history } from "./helpers/history";

import './App.css';
import { GridContainer } from './components/grid/GridContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history} >
          <Switch>
            <Route path="/home" render={(props)=><GridContainer {...props}/>}  />
            <Redirect from="*" to="/home" />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
