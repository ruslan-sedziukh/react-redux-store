import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './ProductPage.css';
import Attribute from "../Attribute/Attribute.js";
import { withRouter } from "react-router-dom";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      attributes: {}
    };

    this.getProduct = this.getProduct.bind(this);
    this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
  }

  async getProduct() {
    // let query1 = "query { category(input: {title: \"" + this.props.match.params.category + "\"}) { product (id: \"" + this.props.match.product + "\" ) { id name attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } } }";
    let query = "query { product (id: \"" + this.props.match.params.product + "\" ) { id name attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } }"
    console.log('>>>>>>> query2:');
    console.log(query);

    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": query
        })
      });

      if (response.ok) {
        const data = await response.json();

        const payload = {
          category: this.props.match.params.category,
          product: data.data.product
        };

        this.setState({ product: data.data.product });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  setDefaultAttributes() {
    if(this.state.product.attributes) {
      let attributes = {};
      this.state.product.attributes.forEach(attribute => {
        attributes[attribute.id] = { item: { id: attribute.items[0].id } };
      });
      this.setState({ attributes: attributes });
    }
  }

  async componentDidMount() {
    await this.getProduct();
    this.setDefaultAttributes();
  }

  render() {
    // console.log(this.props.match.params.category);
    // console.log(this.props.match.params.product);
    // console.log('ProductPage Render');
    // console.log('this.state.product');
    // console.log(this.state.product);
    // console.log('this.state.attributes');
    // console.log(this.state.attributes);

    return (
      <div className="product-page-container">
        {this.props.match.params.category} {this.props.match.params.product}
        sdfsdfsdf
      </div>
    );
  }
}

export default withRouter(ProductPage);