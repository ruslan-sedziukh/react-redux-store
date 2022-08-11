import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { getProducts } from '../../store/categoriesSlice.js';
import './CategoryPage.css';
import ProductPreview from "../ProductPreview/ProductPreview.js";
import PropTypes from 'prop-types';

class CategoryPage extends React.Component {
  async getProducts() {
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query { category(input: {title: \"" + this.props.match.params.category + "\"}) { products { id brand name inStock attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } } }"
        })
      });

      if (response.ok) {
        const data = await response.json();

        const payload = {
          category: this.props.match.params.category,
          products: data.data.category.products
        };

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
    const products = [];

    // Two if`s needed to prevent error occurring when reloading category page. 
    // In this case when component render categories is an empty object and 
    // we need to wait for this data to be fetched before render. 
    if(this.props.categories[this.props.match.params.category] && this.props.currencies.currency) {
      if(this.props.categories[this.props.match.params.category]['products'])
      this.props.categories[this.props.match.params.category]['products'].forEach((element, index) => {
        products.push(<ProductPreview 
          category={this.props.match.params.category} 
          id={element.id}
          index={index} 
          currency={this.props.currencies.currency.label}
          key={element.id}
          />);
        index ++;
      });
    }
    
    return (
      <div className="category-container">
        <h1 className="category-title">{this.props.match.params.category}</h1>
        <div className="products-container">
           {products}
        </div>
      </div>
    );
  }
}

CategoryPage.propTypes = {
  match: PropTypes.object,
  getProducts: PropTypes.func,
  categories: PropTypes.object,
  currencies: PropTypes.object
}

function mapStateToProps(state) {
  return { categories: state.categories, currencies: state.currencies };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (payload) => dispatch(getProducts(payload))
  }
}

const connectedCategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryPage);

export default withRouter(connectedCategoryPage);