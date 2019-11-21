import React from 'react';
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { history } from "./helpers/history";

import logo from './logo.svg';
import './App.css';
import { Grid } from './components/grid/GridItem';
import { GridContainer } from './components/grid/GridContainer';



function App() {
  return (
    <div className="App">
     <Router history={history} >
                <Switch>
                    <Router path="/home" component={GridContainer} />
                    <Redirect from="*" to="/home" />
                </Switch>
            </Router>
        
    </div>
  );
}

export default App;
