import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { history } from "./helpers/history";

import logo from './logo.svg';
import './App.css';
import { Grid } from './components/grid/GridItem';
import { GridContainer } from './components/grid/GridContainer';
import { VideoPlayer } from './components/VideoPlayer/VideoPlayer';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history} >
          <Switch>
            <Route path="/home" render={(props)=><GridContainer {...props}/>}  />
            <Route path="/player/:id" render={(props)=><VideoPlayer {...props}/>} />
            <Redirect from="*" to="/home" />
          </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
