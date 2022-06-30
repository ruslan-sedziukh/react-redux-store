import React from 'react';
import './MiniCart.css';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux';


class MiniCart extends React.Component {
  render() {
    let items = [];
    let index = 0;
    this.props.cart.forEach(item => {
      items.push(
        <CartItem index={index} id={item.id} className='cart-item-container' />
      );
      index ++;
    });

    return (
      <div class='mini-cart-container'>
        <h1>MiniCart</h1>
        {items}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart };
}

export default connect(mapStateToProps)(MiniCart);