import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute, changeAmount } from '../../store/cartSlice.js';
import './CartItem.css';
import Attribute from "../Attribute/Attribute.js";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.plusOne = this.plusOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
  }

  plusOne(){
    const payload = {
      index: this.props.index,
      action: '+'
    };
    this.props.changeAmount(payload);
  }

  minusOne(){
    const payload = {
      index: this.props.index,
      action: '-'
    };
    this.props.changeAmount(payload);
  }

  render() {
    const item = this.props.cart[this.props.index];
    const product = item.product;
    const currencyLabel = this.props.currencies.currency.label;
    const currencySymbol = this.props.currencies.currency.symbol;
    let price;

    product.prices.forEach(element => {
      if(element.currency.label === currencyLabel) {
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
        <div className="cart-item-mini__attributes">
          <p className="cart-item-mini__attributes__name">{attribute.name}:</p>
          <div className="cart-item-mini_attributes_list">
            {attributeList}
          </div>
        </div>
      );
    });

    return (
      <div className="cart-item-mini">
        <div className="cart-item-mini__left">
          <p className="cart-item-mini__name">{product.name} </p>
          <p className="cart-item-mini__price">{currencySymbol}{price}</p>
          {attributes}
        </div>
        <div className="cart-item-mini__right">
          <div className="cart-item-mini__right__amount-container">
            <div 
              className="cart-item-mini__right__amount-container__button"
              onClick={this.plusOne}
            >+</div>
            <div>{item.amount}</div>
            <div 
              className="cart-item-mini__right__amount-container__button"
              onClick={this.minusOne}
            >-</div>
          </div>
          <div className="cart-item-mini__right__img-div">
            <div className="cart-item-mini__right__img-div__img-container">
              <img 
                src={product.gallery[0]} 
                className='cart-item-mini__right__img-div__img-container__img'
              />
            </div>
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
    changeAttribute: (payload) => dispatch(changeAttribute(payload)),
    changeAmount: (payload) => dispatch(changeAmount(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);