import React from 'react';
import './CurrencyItem.css';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/currenciesSlice.js';

class CurrencyItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setCurrency(this.props.currency);
  }

  render() {
    return(
      <div className='currency-item' onClick={this.onClick}>
        {this.props.currency.symbol} {this.props.currency.label}
      </div>
    );
  }
}



function mapStateToProps(state) {
  return { currencies: state.currencies };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => dispatch(setCurrency(currency))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyItem);