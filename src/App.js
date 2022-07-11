import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import CategoryPage from './components/CategoryPage/CategoryPage.js';
import Cart from './components/Cart/Cart.js';
import ProductPage from './components/ProductPage/ProductPage.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <Route>
          <Header />
        </Route>

        <Switch>
          <Route path='/category/:category/product/:product'>
            <ProductPage />
            <div>aaaaaaaaaaaaaaa</div>
          </Route>

          <Route path='/category/:category'>
            <CategoryPage />
          </Route>
        </Switch>

        <Route path='/cart'>
          <Cart isMini={false} />
        </Route>
      </div>
    );
  }
}

export default App;
