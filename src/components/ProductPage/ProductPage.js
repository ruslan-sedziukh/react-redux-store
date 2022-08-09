import React from "react";
import { connect } from "react-redux";
import { addToCart } from '../../store/cartSlice.js';
import './ProductPage.css';
import Attribute from "../Attribute/Attribute.js";
import { withRouter } from "react-router-dom";
import './ProductPage.css';
import ProductPreviewGalleryImg from "../ProductPreviewGalleryImg/ProductPreviewGalleryImg.js";
import dompurify from 'dompurify';
import PropTypes from 'prop-types';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      attributes: {},
      bigImgSrc: ''
    };

    this.getProduct = this.getProduct.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setBigImg = this.setBigImg.bind(this);
  }

  async getProduct() {
    const query = "query { product (id: \"" + this.props.match.params.product + "\" ) { id brand name inStock description attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } }";

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

        this.setState({ product: data.data.product });

        // Set default attributes

        let attributes = {};
        data.data.product.attributes.forEach(attribute => {
          attributes[attribute.id] = { item: { id: attribute.items[0].id } };
        });
        this.setState({ attributes: attributes });

        // Set default big img src 

        this.setState({ bigImgSrc: data.data.product.gallery[0] })
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  setAttribute(attributeId, attributeItemId) {
    this.setState({ 
      attributes: { 
        ...this.state.attributes, 
        [attributeId]: {
           item: { id: attributeItemId }
          }
        }
      });
  }

  addToCart() {
    if(this.state.product.inStock) {
      const payload = {
        category: this.props.match.params.category,
        product: this.state.product,
        attributes: this.state.attributes
      };
      this.props.addToCart(payload);
    }
  }

  setBigImg(src) {
    this.setState({ bigImgSrc: src });
  }

  render() {
    const product = this.state.product;
    const currencyLabel = this.props.currencies.currency ? this.props.currencies.currency.label : '';
    const currencySymbol = this.props.currencies.currency ? this.props.currencies.currency.symbol : '';
    let price;

    let attributes = [];

    let attributesN = 0;
    // eslint-disable-next-line no-unused-vars
    for(let i in this.state.attributes) {
      attributesN ++;
    }

    if(this.state.product.prices) {
      product.prices.forEach(element => {
        if(element.currency.label === currencyLabel) {
          price = element.amount.toFixed(2);
        }
      });
    }

    if(this.state.product.attributes && attributesN){
      product.attributes.forEach(attribute => {
        let attributeList = [];
  
        attribute.items.forEach(element => {
          let theAttribute = false;
          if (this.state.attributes[attribute.id].item.id === element.id) {
            theAttribute = true;
          }
          
          let attributeItem = (<Attribute 
            attributeId={attribute.id} 
            theAttribute={theAttribute} 
            attributeValue={element.value}
            itemId={element.id}
            item={element}
            isMini={this.props.isMini}
            productPage={true}
            setAttribute={this.setAttribute}
            key={element.id}
          />)
          attributeList.push(attributeItem); 
        });
  
        attributes.push(
          <div className="attributes" key={attribute.id}>
            <p className="attributes__name">{attribute.name}:</p>
            <div className="attributes_list">
              {attributeList}
            </div>
          </div>
        );
      });
    }

    let galleryImgs = [];
    if(this.state.product.gallery) {
      this.state.product.gallery.forEach(element => {
        galleryImgs.push(
          <ProductPreviewGalleryImg
          setBigImg={ this.setBigImg }
          src={ element }
          key={ element }
          />
        );
      });
    }

    return (
      <div className="product-page-container">
        <div className="product-page-img-block">
          <div className="img-preview-block">
            {galleryImgs}
          </div>
          <div className="big-img-container">
            <img
              src={ this.state.bigImgSrc }
              className='big-img'
              alt={product.name}
            />
            { this.state.product.inStock ? '' : <div className="product-page-out-of-stock">Out of stock</div> }
          </div>
        </div>

        <div className="product-page-main-info" >
          <p className="product-brand" >{product.brand} </p>
          <p className="product-name" >{product.name} </p>
          {attributes}
          <div className="product-price-block">
            <p className="attributes__name">Price:</p>
            <p className="product-price" >{currencySymbol}{price}</p>
          </div>
          <div 
            className={ this.state.product.inStock ? 'product-page-add-to-cart-button' : 'product-page-add-to-cart-button product-page-add-to-cart-button-not-active' } 
            onClick={ this.addToCart }
          >
            Add to cart
          </div>
          <div 
            className="product-page-desctiption" 
            dangerouslySetInnerHTML={{__html: this.state.product.description ? dompurify.sanitize(this.state.product.description) : ''}}
          >
          </div>
        </div>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.object,
  addToCart: PropTypes.func,
  currencies: PropTypes.object,
  isMini: PropTypes.bool
}

function mapStateToProps(state) {
  return { currencies: state.currencies };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload))
  }
}


const connectedProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPage);

export default withRouter(connectedProductPage);