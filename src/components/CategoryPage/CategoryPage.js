import React from "react";
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { withRouter } from "react-router";
import { getProducts } from '../../store/categoriesSlice.js';

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
          "query" : "query { category(input: {title: \"" + this.props.match.params.category +"\"}) { products { name prices { currency { label } amount } } } }"
        })
      });
      if(response.ok) {
        const data  = await response.json();
        console.log('Fetch work!');
        console.log(data.data);

        const payload = {
            category: this.props.match.params.category,
            products: data.data.category.products
        } ;

        console.log('payload: ');
        console.log(payload);
        this.props.getProducts(payload);

        // !!! Add categories to store here !!!
        // const categories = {};
        // data.data.categories.forEach(category => {
        //   categories[(category.name)] = {};
        // })
        // this.props.getCategories(categories);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.category != this.props.match.params.category) {
      this.getProducts();
    }
  }

  render() {
    console.log('Category: ' + this.props.match.params.category);
    return (
      <h1>{this.props.match.params.category}</h1>
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