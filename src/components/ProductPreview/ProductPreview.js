import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

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

    console.log('this.props.categories: ');
    console.log(this.props.categories);

    console.log('src: ');
    console.log(src);

    return(
      <div className="product-preview">
        <img className="product-preview-img" src={src} />
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