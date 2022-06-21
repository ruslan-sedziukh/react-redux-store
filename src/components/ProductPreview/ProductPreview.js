import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class ProductPreview extends React.Component {
  render() {
    return(
      <div className="product-preview">
        <img className="product-preview-img"/>
        <p className="product-preview-name">{this.props.index}</p>
        <p className="product-preview-price"></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps)(ProductPreview);