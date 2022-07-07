import React from 'react';
import './CurrencyList.css';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/currenciesSlice.js';
import CurrencyItem from '../CurrencyItem/CurrencyItem';

class CurrencyList extends React.Component {
  componentDidMount() {
    let html = document.getElementsByTagName('html');
    html[0].addEventListener('click', this.props.closeCurrencyListOnClickOutside);
    console.log('CurrencyList did mount');
  }

  componentWillUnmount() {
    let html = document.getElementsByTagName('html');
    html[0].removeEventListener('click', this.props.closeCurrencyListOnClickOutside);
    this.props.toggleShouldCloseCurrencyList();
  }

  render() {
    const currencies = [];

    if(this.props.currencies.currencies) {
      this.props.currencies.currencies.forEach(currency => {
        currencies.push(
          <CurrencyItem currency={currency} closeList={this.props.closeList} />
        );
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