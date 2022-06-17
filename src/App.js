import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Nav from './components/Nav/Nav.js';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route>
          <Nav></Nav>
        </Route>

        <Switch>
          <Route path='/about'>
            <h1>ABOUT WHAT?</h1>
          </Route>

          <Route path='/'>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
