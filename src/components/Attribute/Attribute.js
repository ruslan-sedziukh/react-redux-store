import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './Attribute.css';

class Attribute extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let payload = {
      index: this.props.index,
      attribute: {
        id: this.props.attributeId,
        item: { id: this.props.itemId }
      }
    };
    this.props.changeAttribute(payload);
  }

  render() {
    let htmlElement;

    if (this.props.attributeId === 'Color') {
      if (this.props.theAttribute) {
        htmlElement = (
          <div
            className="cart-item__attributes__list__the-color-attribute-container"
            onClick={this.onClick}
          >
            <div
              className='cart-item__attributes__list__the-color-attribute-container__color-attribute'
              style={{ backgroundColor: this.props.attributeValue }}
            ></div>
          </div>
        );
      }
      else {
        htmlElement = (
          <div
            className='cart-item__attributes__list__color-attribute'
            style={{ backgroundColor: this.props.attributeValue }}
            onClick={this.onClick}
          ></div>
        );
      }
    }
    else {
      htmlElement = (
        <label>
          <div
            className={this.props.theAttribute ? 'cart-item__attributes__list__the-attribute' : 'cart-item__attributes__list__attribute'}
            onClick={this.onClick}
          >
            {this.props.attributeValue}
          </div>
        </label>
      );
    }

    return htmlElement;
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


export default connect(mapStateToProps, mapDispatchToProps)(Attribute);