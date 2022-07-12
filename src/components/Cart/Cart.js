import React from 'react';
import './Cart.css';
import CartItem from '../CartItem/CartItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
  componentDidMount() {
    if(this.props.isMini) {
      let html = document.getElementsByTagName('html');
      html[0].addEventListener('click', this.props.closeCartOnClickOutside);
    }
  }

  componentWillUnmount() {
    if(this.props.isMini) {
      let html = document.getElementsByTagName('html');
      html[0].removeEventListener('click', this.props.closeCartOnClickOutside);
      this.props.toggleShouldCloseCart();
    }
  }

  render() {
    let items = [];
    let index = 0;
    let amount = 0;
    let total = 0;
    const currencySymbol = this.props.currencies.currency ? this.props.currencies.currency.symbol : '';

    this.props.cart.forEach(item => {
      items.push(
        <CartItem index={index} id={item.product.id} isMini={this.props.isMini} toggleMiniCart={this.props.toggleMiniCart}/>
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


    // Mini and bige elements
    const miniCartHead = (
      <div className='mini-cart-container__cart-head'>
        <span className='mini-cart-container__cart-head__bold'>My Bag</span>
        <span className='mini-cart-container__cart-head__light'>, {amount} items</span>
      </div>
    );

    const bigCartHead = (
      <div className='cart-container_head'>
        <h1 className='cart-container_head_h1'>Cart</h1>
      </div>
    );

    const miniCartFooter = (
      <div>
        <div className='mini-cart-container__total'>
          <span>Total</span>
          <span>{currencySymbol}{Math.round(total * 100) / 100}</span>
        </div>
        <div className='mini-cart-container__buttons-container' >
          <Link className='mini-cart-container__buttons-container__view-bag' to='/cart' onClick={this.props.toggleMiniCart}>View bag</Link>
          <div className='mini-cart-container__buttons-container__checkout' onClick={() => window.alert('Add checkout!')}>Checkout</div>
        </div>
      </div>
    );

    let quantity = 0;
    this.props.cart.forEach(element => {
      quantity = quantity + element.amount;
    });

    const cartFooter = (
      <div className='cart-container__footer'>
        <table className='cart-container__footer__total'>
          <tbody>
            <tr>
              <td>Tax 21%:</td>
              <td>{currencySymbol}{Math.round((total * 0.21) * 100) / 100}</td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td>{quantity}</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>{currencySymbol}{Math.round(total * 100) / 100}</td>
            </tr>
          </tbody>
        </table>
        <div className='cart-container__footer__buttons-container__order' onClick={() => window.alert('Add checkout!')}>Order</div>
      </div>
    );

    return (
      <div>
        <div className={ this.props.isMini ? 'mini-cart-container' : 'cart-container'}>
          { this.props.isMini ? miniCartHead : bigCartHead }
          {items}
          { this.props.isMini ? miniCartFooter : cartFooter }
        </div>
        { this.props.isMini ? <div className='mini-cart-background'></div> : ''}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cart: state.cart, currencies: state.currencies };
}

export default connect(mapStateToProps)(Cart);