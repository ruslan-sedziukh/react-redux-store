import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../store/cartSlice.js';

class CartItem extends React.Component {
  render() {
    // let categoryObject = this.props.categories[this.props.cart[this.props.index].category];
    // console.log(categoryObject);
    let product = this.props.cart[this.props.index].product;
    let price;

    product.prices.forEach(element => {
      if(element.currency.label === this.props.currencies.currency.label) {
        price = element.amount;
      }
    });

    return (
      <div className="cart-item-container">
        <div>
          <p className="cart-item-name">{product.name} </p>
          <p className="cart-item-price">{price} </p>
          
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, currencies: state.currencies, cart: state.cart };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: addToCart
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);