import React from "react";
import './ProductPreviewGalleryImg.css';

class ProductPreviewGalleryImg extends React.Component {
  constructor(props) {
    super(props);
    this.changeBigImg = this.changeBigImg.bind(this);
  }

  changeBigImg() {
    this.props.setBigImg(this.props.src);
  }

  render() {
    return (
      <div className="product-preview-gallery-img-container">
        <img 
          src={this.props.src} 
          onClick={ this.changeBigImg }
          className='product-preview-gallery-img'
        />
      </div>
    );
  }
}

export default ProductPreviewGalleryImg;