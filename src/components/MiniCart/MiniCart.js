import React from 'react';
import './MiniCart.css';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class MiniCart extends React.Component {
  render() {
    let items = [];
    let index = 0;
    let amount = 0;
    let total = 0;
    const currencySymbol = this.props.currencies.currency.symbol;

    this.props.cart.forEach(item => {
      items.push(
        <CartItem index={index} id={item.product.id} className='cart-item-container' />
      );
      index++;
      amount = amount + item.amount;

      let price;

      item.product.prices.forEach(element => {
        if(element.currency.symbol === currencySymbol) {
          price = element.amount;
        }
      });

      total = total + (item.amount * price);
    });

    return (
      <div>
        <div className='mini-cart-container'>
          <div className='mini-cart-container__cart-head'>
            <span className='mini-cart-container__cart-head__bold'>My Bag</span>
            <span className='mini-cart-container__cart-head__light'>, {amount} items</span>
          </div>
          {items}
          <div className='mini-cart-container__total'>
            <span>Total</span>
            <span>{currencySymbol}{Math.round(total * 100) / 100}</span>
          </div>
          <div className='mini-cart-container__buttons-container'>
            <Link className='mini-cart-container__buttons-container__view-bag' to='/cart'>View bag</Link>
            <div className='mini-cart-container__buttons-container__checkout' onClick={() => window.alert('Add checkout!')}>Checkout</div>
          </div>
        </div>
        <div className='mini-cart-background'></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currencies: state.currencies };
}

export default connect(mapStateToProps)(MiniCart);