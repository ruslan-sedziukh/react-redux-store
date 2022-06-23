import React from 'react';
import './CurrencyList.css';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/currenciesSlice.js';

class CurrencyList extends React.Component {
  render() {
    const currencies = [];

    if(this.props.currencies.currencies) {
      console.log('>>>>>>>');
      console.log(this.props.currencies.currencies);

      this.props.currencies.currencies.forEach(currency => {
        currencies.push(<div className='currency-list-currency'>{currency.symbol} {currency.label}</div>);
      });
    }

    return(
      <div className='currency-list-container'>
        {currencies}
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


export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);