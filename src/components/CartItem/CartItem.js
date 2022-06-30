import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../store/cartSlice.js';

class CartItem extends React.Component {
  render() {
    let item = this.props.cart[this.props.index];
    let product = item.product;
    let price;

    product.prices.forEach(element => {
      if(element.currency.label === this.props.currencies.currency.label) {
        price = element.amount;
      }
    });

    let attributes = [];
    product.attributes.forEach(attribute => {
      attributes.push(
        <div className="cart-item-attributes">
          <p className="cart-item-attributes-name">{attribute.name}</p>
          <div className="cart-item-attributes-list">
            
          </div>
        </div>
      );
    });

    return (
      <div className="cart-item-container">
        <div>
          <p className="cart-item-name">{product.name} </p>
          <p className="cart-item-price">{price} </p>
          {attributes}
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