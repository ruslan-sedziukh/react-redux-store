import React from 'react';
import './CurrencyItem.css';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/currenciesSlice.js';
import PropTypes from 'prop-types';

class CurrencyItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setCurrency(this.props.currency);
    this.props.closeList();
  }

  render() {
    return(
      <div className='currency-item' onClick={this.onClick}>
        {this.props.currency.symbol} {this.props.currency.label}
      </div>
    );
  }
}

CurrencyItem.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  closeList: PropTypes.func
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