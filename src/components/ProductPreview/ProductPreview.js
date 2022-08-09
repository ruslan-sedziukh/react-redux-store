import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './ProductPreview.css';
import cart from './cart.svg';
import { addToCart } from '../../store/cartSlice.js';

class ProductPreview extends React.Component {
  constructor(props) {
    super(props);
    this.cartClick = this.cartClick.bind(this);
  }

  onMouseEnter(event) {
    // Get product-preview
    let node = event.target; 
    while(node.className != 'product-preview') {
      node = node.parentElement;
    }

    // Display cart
    const elements = node.getElementsByClassName('product-preview-cart-container');
    elements[0].style.display = 'flex';

    // Focus product-preview
    node.style.boxShadow = '0px 4px 35px rgba(168, 172, 176, 0.19)';
  }

  onMouseLeave(event) {
    // Get product-preview
    let node = event.target; 
    while(node.className != 'product-preview') {
      node = node.parentElement;
    }

    // Hide cart
    const elements = node.getElementsByClassName('product-preview-cart-container');
    elements[0].style.display = 'none';

    // Unfocus product-preview
    node.style.boxShadow = '';
  }

  cartClick() {
    let product = this.props.categories[this.props.category]['products'][this.props.index];

    if(product.inStock) {
      let cartPayload = { 
        category: this.props.category, 
        product: product, 
        attributes: {}
      };
  
      if(product.attributes) {
        product.attributes.forEach(attribute => {
          cartPayload.attributes[attribute.id] = { item: { id: attribute.items[0].id } };
        });
      }
  
      this.props.addToCart(cartPayload);
    }
  }

  render() {
    const product = this.props.categories[this.props.category]['products'][this.props.index];
    const pricesArr = product.prices;
    const priceIndex = pricesArr.findIndex(element => {
      return element.currency.label === this.props.currency;
    });
    const symbol = pricesArr[priceIndex]['currency']['symbol'];
    const amount = pricesArr[priceIndex]['amount'].toFixed(2);
    const src = product.gallery[0];

    return(
      <div className="product-preview" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="product-preview-img-container">
          <div>
            <img className="product-preview-img" src={src} />
          </div>
          <div className={ product.inStock ?  "product-preview-cart-container" : "product-preview-cart-container product-preview-cart-container-not-active" } onClick={ this.cartClick }>
            <img className="product-preview-cart" src={cart} />
          </div>
          { product.inStock ? '' : <div className="product-preview-out-of-stock">Out of stock</div> }
        </div>
        <Link to={ '/category/' + this.props.category + '/product/' + this.props.id  } >
          <p className="product-preview-name">{product.brand} {product.name}</p> 
        </Link>
        <p className="product-preview-price">{symbol}{amount}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPreview);