import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Header from './components/Header/Header.js';
import CategoryPage from './components/CategoryPage/CategoryPage.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route>
          <Header />
        </Route>

        <Route path='/category/:category'>
          <CategoryPage />
        </Route>
      </div>
    );
  }
}

export default App;
