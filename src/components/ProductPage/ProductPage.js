import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './ProductPage.css';
import Attribute from "../Attribute/Attribute.js";
import { withRouter } from "react-router-dom";

class ProductPage extends React.Component {
  render() {
    // console.log(this.props.match.params.category);
    // console.log(this.props.match.params.product);
    console.log('ProductPage Render');

    return (
      <div className="product-page-container">
        {this.props.match.params.category} {this.props.match.params.product}
        sdfsdfsdf
      </div>
    );
  }
}

export default withRouter(ProductPage);