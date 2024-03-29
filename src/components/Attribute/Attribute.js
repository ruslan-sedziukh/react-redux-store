import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './Attribute.css';
import PropTypes from 'prop-types';

class Attribute extends React.Component {
  constructor(props){
    super(props);
    this.changeAttributeOfCartItem = this.changeAttributeOfCartItem.bind(this);
    this.changeAttributeOfProductPage = this.changeAttributeOfProductPage.bind(this);
  }

  changeAttributeOfCartItem() {
    const payload = {
      index: this.props.index,
      attribute: {
        id: this.props.attributeId,
        item: { id: this.props.itemId }
      }
    };
    this.props.changeAttribute(payload);
  }

  changeAttributeOfProductPage() {
    this.props.setAttribute(this.props.attributeId, this.props.itemId);
  }

  render() {
    let htmlElement;

    if (this.props.attributeId === 'Color') {
      if (this.props.theAttribute) {
        htmlElement = (
          <div
            className={ this.props.isMini ? "the-color-attribute-container-mini" : "the-color-attribute-container" }
            onClick={this.props.productPage ? this.changeAttributeOfProductPage : this.changeAttributeOfCartItem}
          >
            <div
              className={ this.props.isMini ? 'the-color-attribute-container-mini__color-attribute-mini' : 'the-color-attribute-container__color-attribute' } 
              style={{ backgroundColor: this.props.attributeValue }}
            ></div>
          </div>
        );
      }
      else {
        htmlElement = (
          <div
            className={ this.props.isMini ? 'color-attribute-mini' : 'color-attribute' } 
            style={{ backgroundColor: this.props.attributeValue }}
            onClick={this.props.productPage ? this.changeAttributeOfProductPage : this.changeAttributeOfCartItem}
          ></div>
        );
      }
    }
    else {
      htmlElement = (
        <div
          className={this.props.theAttribute ? (this.props.isMini ? 'the-attribute-mini' : 'the-attribute') : (this.props.isMini ? 'attribute-mini' : 'attribute') }
          onClick={this.props.productPage ? this.changeAttributeOfProductPage : this.changeAttributeOfCartItem}
        >
          {this.props.attributeValue}
        </div>
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

Attribute.propTypes = {
  index: PropTypes.number,
  attributeId: PropTypes.string,
  itemId: PropTypes.string,
  changeAttribute: PropTypes.func,
  setAttribute: PropTypes.func,
  theAttribute: PropTypes.bool,
  isMini: PropTypes.bool,
  productPage: PropTypes.bool,
  attributeValue: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);