import React from "react";
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { withRouter } from "react-router";

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
          "query" : "query { category(input: {title: tech}) { products { name prices { currency { label } amount } } } }"
        })
      });
      if(response.ok) {
        const data  = await response.json();
        console.log('Fetch work!');
        console.log(data.data);

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

  render() {
    console.log('Category: ' + this.props.match.params.category);
    return (
      <h1>{this.props.match.params.category}</h1>
    );
  }
}

export default withRouter(CategoryPage);