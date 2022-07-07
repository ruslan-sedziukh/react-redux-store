import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import CategoryPage from './components/CategoryPage/CategoryPage.js';
import Cart from './components/Cart/Cart.js';

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

        <Route path='/cart'>
          <Cart isMini={false} />
        </Route>
      </div>
    );
  }
}

export default App;
