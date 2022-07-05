import React from 'react';
import './MiniCart.css';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux';


class MiniCart extends React.Component {
  render() {
    let items = [];
    let index = 0;
    let amount = 0;

    this.props.cart.forEach(item => {
      items.push(
        <CartItem index={index} id={item.product.id} className='cart-item-container' />
      );
      index++;
      amount = amount + item.amount;
    });

    return (
      <div>
        <div className='mini-cart-container'>
          <div className='mini-cart-container__cart-head'><span>My Bag</span><span>, {amount} items</span></div>
          {items}
        </div>
        <div className='mini-cart-background'></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

export default connect(mapStateToProps)(MiniCart);