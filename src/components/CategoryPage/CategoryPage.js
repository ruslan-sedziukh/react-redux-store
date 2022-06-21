import React from "react";
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import { getProducts } from '../../store/categoriesSlice.js';
import './CategoryPage.css';

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
          "query": "query { category(input: {title: \"" + this.props.match.params.category + "\"}) { products { name prices { currency { label } amount } } } }"
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
    console.log('Category: ' + this.props.match.params.category);
    return (
      <div className="category-page">
        <h1 className="category-title">{this.props.match.params.category}</h1>
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