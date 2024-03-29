import './App.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header.js';
import CategoryPage from './components/CategoryPage/CategoryPage.js';
import Cart from './components/Cart/Cart.js';
import ProductPage from './components/ProductPage/ProductPage.js';
import { connect } from 'react-redux';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    let categorie = '';
    for(let i in this.props.categories) {
      categorie = i;
      break;
    }

    return (
      <div>
        <ScrollToTop />

        <Route>
          <Header />
        </Route>

        <Switch>
          <Route path='/category/:category/product/:product'>
            <ProductPage />
          </Route>

          <Route path='/category/:category'>
            <CategoryPage />
          </Route>

          <Route path='/cart'>
            <Cart isMini={false} />
          </Route>

          <Route path='/'>
            <Redirect to={ `/category/${categorie}` } />
          </Route>
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  categories: PropTypes.object
}

function mapStateToProps(state) {
  return { categories: state.categories };
}


export default connect(mapStateToProps)(App);
