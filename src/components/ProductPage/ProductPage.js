import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './ProductPage.css';
import Attribute from "../Attribute/Attribute.js";
import { withRouter } from "react-router-dom";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.getProduct = this.getProduct.bind(this);
  }

  async getProduct() {
    let query1 = "query { category(input: {title: \"" + this.props.match.params.category + "\"}) { product (id: \"" + this.props.match.product + "\" ) { id name attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } } }";
    let query2 = "query { product (id: \"" + this.props.match.params.product + "\" ) { id name attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } }"
    console.log('>>>>>>> query2:');
    console.log(query2);

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": query2
        })
      });

      if (response.ok) {
        const data = await response.json();

        console.log('>>>>>>> data: ');
        console.log(data);

        const payload = {
          category: this.props.match.params.category,
          product: data.data.product
        };

        console.log('>>>>>>> payload: ');
        console.log(payload);

        // this.props.getProducts(payload);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    console.log(this.props.match.params.category);
    console.log(this.props.match.params.product);
    // console.log('ProductPage Render');

    return (
      <div className="product-page-container">
        {this.props.match.params.category} {this.props.match.params.product}
        sdfsdfsdf
      </div>
    );
  }
}

export default withRouter(ProductPage);