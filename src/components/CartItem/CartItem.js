import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../store/cartSlice.js';

class CartItem extends React.Component {
  render() {
    return (
      <div className="cart-item-container">
        <div>
          {this.props.cart[this.props.index].id}
          {this.props.cart[this.props.index].amount}
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