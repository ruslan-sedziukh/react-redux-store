import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from './components/Header/Header.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route>
          <Header />
        </Route>

        <Switch>
          <Route path='/all'>
            <h1>ABOUT WHAT?</h1>
          </Route>

          <Route path='/about'>
            <h1>ABOUT WHAT?</h1>
          </Route>

          <Route path='/tech'>
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
      </div>
    );
  }
}

export default App;
