import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './CartItem.css';
import Attribute from "../Attribute/Attribute.js";

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
      let attributeList = [];

      attribute.items.forEach(element => {
        let theAttribute = false;
        if (item.attributes[attribute.id].item.id === element.id) {
          theAttribute = true;
        }

        
        let attributeItem = (<Attribute 
          index={this.props.index}
          attributeId={attribute.id} 
          theAttribute={theAttribute} 
          attributeValue={element.value}
          itemId={element.id}
        />)
        attributeList.push(attributeItem); 
      });

      attributes.push(
        <div className="cart-item__attributes">
          <p className="cart-item__attributes__name">{attribute.name}:</p>
          <div className="cart-item_attributes_list">
            {attributeList}
          </div>
        </div>
      );
    });

    return (
      <div className="cart-item">
        <div className="cart-item__left">
          <p className="cart-item__name">{product.name} </p>
          <p className="cart-item__price">{price} </p>
          {attributes}
        </div>
        <div className="cart-item__right">
          <div className="cart-item__right__amount-container">
            <button className="cart-item__right__amount-container__button">+</button>
            <div>{item.amount}</div>
            <button className="cart-item__right__amount-container__button">-</button>
          </div>
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
    addToCart: (payload) => dispatch(addToCart(payload)),
    changeAttribute: (payload) => dispatch(changeAttribute(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);