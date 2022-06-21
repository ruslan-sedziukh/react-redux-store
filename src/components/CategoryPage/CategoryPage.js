import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getProducts } from '../../store/categoriesSlice.js';
import './CategoryPage.css';
import CategoryPreview from '../ProductPreview/ProductPreview.js';
import ProductPreview from "../ProductPreview/ProductPreview.js";

class CategoryPage extends React.Component {
  async getProducts() {
    console.log('Call getProducts');
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query { category(input: {title: \"" + this.props.match.params.category + "\"}) { products { name prices { currency { label } amount } gallery } } }"
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetch work!');
        console.log(data.data);

        const payload = {
          category: this.props.match.params.category,
          products: data.data.category.products
        };

        console.log('payload: ');
        console.log(payload);
        this.props.getProducts(payload);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.category != this.props.match.params.category) {
      this.getProducts();
    }
  }

  render() {
    console.log('>>>>> category: ');
    console.log(this.props.categories/* [this.props.match.params.category] */);

    let products = [];
    let index = 0;

    // Two if`s needed to prevent error occurring when reloading category page. 
    // In this case when component render categories is an empty object and 
    // we need to wait for this data to be fetched before render. 
    if(this.props.categories[this.props.match.params.category]) {
      if(this.props.categories[this.props.match.params.category]['products'])
      this.props.categories[this.props.match.params.category]['products'].forEach(element => {
        products.push(<ProductPreview category={this.props.match.params.category} index={index} />);
        index ++;
      });
    }
    
    return (
      <div className="category-container">
        <h1 className="category-title">{this.props.match.params.category}</h1>
        <div className="products-container">
           {/* Here should be product-preview */}
           {products}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getProducts: (payload) => dispatch(getProducts(payload))
  }
}

const connectedCategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default withRouter(connectedCategoryPage);