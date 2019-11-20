import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { history } from "./helpers/history";

import logo from './logo.svg';
import './App.css';
import { Grid } from './components/grid/Grid';
import { GridContainer } from './components/grid/GridContainer';
import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history} >
          <Switch>
            <Router path="/home" component={GridContainer} />
            <Router path="/player/:id" render={(props)=><VideoPlayer {...props}/>} />
            <Redirect from="*" to="/home" />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
