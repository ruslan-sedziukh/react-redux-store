import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../store/cartSlice.js';
import './CartItem.css';

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

        let htmlElement; 
        
        if(attribute.id === 'Color') {
          if(theAttribute) {
            htmlElement = (
              <div className="cart-item__attributes__list__the-color-attribute-container">
                <div 
                  className='cart-item__attributes__list__the-color-attribute-container__color-attribute' 
                  style={ {backgroundColor: element.value} }
                ></div>
              </div>
            );
          }
          else {
            htmlElement = (
              <div 
                className='cart-item__attributes__list__color-attribute' 
                style={ {backgroundColor: element.value} }
              >
                {theAttribute ? '(!)' : ''}
              </div>
            );
          }
        }
        else {
          htmlElement = (
            <div className={theAttribute ? 'cart-item__attributes__list__the-attribute' : 'cart-item__attributes__list__attribute'}>
              {element.value}
            </div>
          );
        }
        
        attributeList.push(htmlElement);
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
        <div>
          <p className="cart-item__name">{product.name} </p>
          <p className="cart-item__price">{price} </p>
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