import React from "react";
import { connect } from "react-redux";
import { addToCart, changeAttribute, changeAmount } from '../../store/cartSlice.js';
import './CartItem.css';
import Attribute from "../Attribute/Attribute.js";
import arrowImg from './Vector.svg';
import { Link } from "react-router-dom";

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { galleryIndex: 0 };

    this.plusOne = this.plusOne.bind(this);
    this.minusOne = this.minusOne.bind(this);
    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);
  }

  plusOne(){
    const payload = {
      index: this.props.index,
      action: '+'
    };
    this.props.changeAmount(payload);
  }

  minusOne(){
    const payload = {
      index: this.props.index,
      action: '-'
    };
    this.props.changeAmount(payload);
  }

  nextImg() {
    const item = this.props.cart[this.props.index];
    const product = item.product;

    let newGalleryIndex = this.state.galleryIndex + 1;

    if(newGalleryIndex === (product.gallery.length)) {
      newGalleryIndex = 0;
    }

    this.setState( { galleryIndex: newGalleryIndex } );
  }

  prevImg() {
    const item = this.props.cart[this.props.index];
    const product = item.product;

    let newGalleryIndex = this.state.galleryIndex - 1;

    if(newGalleryIndex === -1) {
      newGalleryIndex = product.gallery.length - 1;
    }

    this.setState( { galleryIndex: newGalleryIndex } );
  }

  render() {
    const item = this.props.cart[this.props.index];
    const product = item.product;
    const currencyLabel = this.props.currencies.currency.label;
    const currencySymbol = this.props.currencies.currency.symbol;
    let price;

    product.prices.forEach(element => {
      if(element.currency.label === currencyLabel) {
        price = element.amount.toFixed(2);
      }
    });

    let attributes = [];

    product.attributes.forEach(attribute => {
      let attributeList = [];

      attribute.items.forEach(element => {
        let theAttribute = false;
        if (item.attributes[attribute.id].item.id === element.id) {
          theAttribute = true;
        }

        
        let attributeItem = (<Attribute 
          index={this.props.index}
          attributeId={attribute.id} 
          theAttribute={theAttribute} 
          attributeValue={element.value}
          itemId={element.id}
          isMini={this.props.isMini}
          key={element.id}
        />)
        attributeList.push(attributeItem); 
      });

      attributes.push(
        <div className={ this.props.isMini ? "cart-item-mini__attributes" : "cart-item__attributes"} key={attribute.id} >
          <p className={this.props.isMini ? "cart-item-mini__attributes__name" : "cart-item__attributes__name"}>{attribute.name}:</p>
          <div className="cart-item_attributes_list">
            {attributeList}
          </div>
        </div>
      );
    });

    const changeImgButtons = (
      <div className="cart-item__right__img-div__buttons-container">
        <div 
          className="cart-item__right__img-div__buttons-container__button" 
          onClick={ this.prevImg }
        >
          <img src={ arrowImg } />
        </div>
        <div 
          className="cart-item__right__img-div__buttons-container__button" 
          onClick={ this.nextImg }
        >
          <img src={ arrowImg } />
        </div>
      </div>
    );

    return (
      <div className={ this.props.isMini ? "cart-item-mini" : "cart-item"}>
        <div className={ this.props.isMini ? "cart-item-mini__left" : "cart-item__left" }>
          <Link to={ `/category/${item.category}/product/${product.id}`} onClick={this.props.toggleMiniCart} >
            <p className={ this.props.isMini ? 'cart-item-mini__name' : 'cart-item-product-brand' } >{product.brand}</p>
            <p className={ this.props.isMini ? "cart-item-mini__name" : "cart-item__name" }>{product.name} </p>
          </Link>
          <p className={ this.props.isMini ? "cart-item-mini__price" : "cart-item__price" }>{currencySymbol}{price}</p>
          {attributes}
        </div>
        <div className="cart-item__right">
          <div className={ this.props.isMini ? "cart-item-mini__right__amount-container" : "cart-item__right__amount-container"}>
            <div 
              className={ this.props.isMini ? "cart-item-mini__right__amount-container__button" : "cart-item__right__amount-container__button"}
              onClick={this.plusOne}
            >+</div>
            <div>{item.amount}</div>
            <div 
              className={ this.props.isMini ? "cart-item-mini__right__amount-container__button" : "cart-item__right__amount-container__button"}
              onClick={this.minusOne}
            >-</div>
          </div>
          <div className="cart-item__right__img-div">
            <div className={ this.props.isMini ? "cart-item-mini__right__img-div__img-container" : "cart-item__right__img-div__img-container"}>
              <img 
                src={ product.gallery[this.state.galleryIndex] } 
                className={ this.props.isMini ? "cart-item-mini__right__img-div__img-container__img" : "cart-item__right__img-div__img-container__img"}
              />
            </div>
            { this.props.isMini ? '' : ( product.gallery.length > 1 ? changeImgButtons : '') }
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, currencies: state.currencies, cart: state.cart };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (payload) => dispatch(addToCart(payload)),
    changeAttribute: (payload) => dispatch(changeAttribute(payload)),
    changeAmount: (payload) => dispatch(changeAmount(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartItem);