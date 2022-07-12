import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute } from '../../store/cartSlice.js';
import './ProductPage.css';
import Attribute from "../Attribute/Attribute.js";
import { withRouter } from "react-router-dom";
import './ProductPage.css';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      attributes: {}
    };

    this.getProduct = this.getProduct.bind(this);
    this.setAttribute = this.setAttribute.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  async getProduct() {
    const query = "query { product (id: \"" + this.props.match.params.product + "\" ) { id name description attributes { id name items { displayValue value id } } prices { currency { label symbol } amount } gallery } }"
    // console.log('>>>>>>> query2:');
    // console.log(query);

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

        // Set default attributes

        let attributes = {};
        data.data.product.attributes.forEach(attribute => {
          attributes[attribute.id] = { item: { id: attribute.items[0].id } };
        });
        this.setState({ attributes: attributes });
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  setAttribute(attributeId, attributeItem) {
    this.setState({ 
      attributes: { 
        ...this.state.attributes, 
        [attributeId]: {
           item: attributeItem 
          }
        }
      });
  }

  addToCart() {
    const payload = {
      category: this.props.match.params.category,
      product: this.state.product,
      attributes: this.state.attributes
    };
    this.props.addToCart(payload);
  }

  render() {
    // console.log(this.props.match.params.category);
    // console.log(this.props.match.params.product);
    console.log('ProductPage Render');
    console.log('this.state.product');
    console.log(this.state.product);
    console.log('this.state.attributes');
    console.log(this.state.attributes);

    const product = this.state.product;
    const currencyLabel = this.props.currencies.currency ? this.props.currencies.currency.label : '';
    const currencySymbol = this.props.currencies.currency ? this.props.currencies.currency.symbol : '';
    let price;

    let attributes = [];

    let attributesN = 0;
    for(let i in this.state.attributes) {
      attributesN ++;
    }

    if(this.state.product.attributes && attributesN){
      product.prices.forEach(element => {
        if(element.currency.label === currencyLabel) {
          price = element.amount;
        }
      });

      product.attributes.forEach(attribute => {
        let attributeList = [];
  
        attribute.items.forEach(element => {
          let theAttribute = false;
          if (this.state.attributes[attribute.id].item.id === element.id) {
            theAttribute = true;
          }
          
          let attributeItem = (<Attribute 
            // index={this.props.index}
            attributeId={attribute.id} 
            theAttribute={theAttribute} 
            attributeValue={element.value}
            itemId={element.id}
            item={element}
            isMini={this.props.isMini}
            productPage={true}
            setAttribute={this.setAttribute}
          />)
          attributeList.push(attributeItem); 
        });
  
        attributes.push(
          <div className="attributes">
            <p className="attributes__name">{attribute.name}:</p>
            <div className="attributes_list">
              {attributeList}
            </div>
          </div>
        );
      });
    }

    return (
      <div className="product-page-container">
        <div className="product-page-main-info" >
          <p className="product-name" >{product.name} </p>
          {attributes}
          <div className="product-price-block">
            <p className="attributes__name">Price:</p>
            <p className="product-price" >{currencySymbol}{price}</p>
          </div>
          <div className='product-page-add-to-cart-button' onClick={ this.addToCart }>Add to cart</div>
          <div 
            className="product-page-desctiption" 
            dangerouslySetInnerHTML={{__html: this.state.product.description ? this.state.product.description : ''}}
          >
          </div>
        </div>
      </div>
    );
  }
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