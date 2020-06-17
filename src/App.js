import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

//Layout
import Navbar from './Components/layout/Navbar';
import Dashboard from './Components/layout/Dashboard';
import Pokemon from './Components/pokemon/Pokemon';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="container">
        <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/pokemon/:pokemonID" component={Pokemon} />
        <Dashboard />
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
