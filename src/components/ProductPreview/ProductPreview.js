import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './ProductPreview.css';
import cart from './cart.svg';

class ProductPreview extends React.Component {
  render() {
    const name = this.props.categories[this.props.category]['products'][this.props.index]['name'];
    const pricesArr = this.props.categories[this.props.category]['products'][this.props.index]['prices'];
    const priceIndex = pricesArr.findIndex(element => {
      return element.currency.label === this.props.currency;
    });
    const symbol = pricesArr[priceIndex]['currency']['symbol'];
    const amount = pricesArr[priceIndex]['amount'];
    const src = this.props.categories[this.props.category]['products'][[this.props.index]]['gallery'][0];

    return(
      <div className="product-preview">
        <div className="product-preview-img-container">
          <img className="product-preview-img" src={src} />
          <div className="product-preview-cart-container">
            <img className="product-preview-cart" src={cart} />
          </div>
        </div>
        <p className="product-preview-name">{name}</p>
        <p className="product-preview-price">{symbol}{amount}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps)(ProductPreview);