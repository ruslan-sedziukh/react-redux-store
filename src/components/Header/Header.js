import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from './cart.svg';
import arrow from './arrow.svg';
import logo from './Brand icon.svg';
import { connect } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice.js';
import { getCurrencies, setCurrency } from '../../store/currenciesSlice.js';
import CurrencyList from '../CurrencyList/CurrencyList.js';
import MiniCart from '../MiniCart/MiniCart';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currencyList: false, miniCart: false };
    this.currencyOnClick = this.currencyOnClick.bind(this);
    this.closeList = this.closeList.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }

  async getCategories() {
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query { categories { name } }"
        })
      });
      if(response.ok) {
        const data = await response.json();

        const categories = {};
        data.data.categories.forEach(category => {
          categories[(category.name)] = {};
        })
        this.props.getCategories(categories);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  async getCurrencies() {
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query": "query { currencies { label symbol } }"
        })
      });
      if(response.ok) {
        const data = await response.json();

        const currencies = data.data.currencies;
        this.props.getCurrencies(currencies);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  setDefaultCurrency() {
    this.props.setCurrency(this.props.currencies.currencies[0]);
  }

  async componentDidMount() {
    await this.getCategories();
    await this.getCurrencies();
    this.setDefaultCurrency();
  }

  currencyOnClick(){
    if(this.state.currencyList === false) {
      this.setState({ currencyList: true });
    }
    else {
      this.setState({ currencyList: false });
    }
  }

  closeList() {
    this.setState({ currencyList: false });
  }

  toggleMiniCart(){
    if(this.state.miniCart === false) {
      this.setState({ miniCart: true });
    }
    else {
      this.setState({ miniCart: false });
    }
  }

  render() {
    const links = [];

    for (let category in this.props.categories) {
      links.push(<NavLink to={'/category/' + category}>{category}</NavLink>);
    };

    let arrowClass = '';
    if(this.state.currencyList === false) {
      arrowClass = 'header-nav-currency-arrow header-nav-currency-arrow-down';
    }
    else {
      arrowClass = 'header-nav-currency-arrow header-nav-currency-arrow-up';
    }

    let counter = 0;
    let badgeOn = false;
    this.props.cart.forEach(element => {
      counter = counter + element.amount;
    });
    if(counter) {
      badgeOn = true;
    }

    // =========================
    // ====== Cart test ========
    console.log('>>>>>> Cart:');
    console.log(this.props.cart);

    return (
      <div className='header-container'>
        <div className='header'>
          <nav className='header-nav'>

            <div className='header-nav-left'>
              {links}
            </div>

            <img src={logo} className='header-nav-logo' />

            <div className='header-nav-right'>

              <div className='header-nav-currency-container'> 

                <div className='header-nav-currency' onClick={this.currencyOnClick}>
                  {this.props.currencies.currency? this.props.currencies.currency.symbol : ''}
                  <img src={arrow} className={arrowClass} />
                </div>

                {this.state.currencyList ? <CurrencyList closeList={this.closeList} /> : ''}

              </div>

              <div className='header-nav-right-cart-div' onClick={this.toggleMiniCart} >
                <img src={cart} alt='Cart image' className='header-nav-cart' />
                {badgeOn ? <div className='header-nav-cart-counter'>{counter}</div> : ''}
                {this.state.miniCart ? <MiniCart /> : ''}
              </div>

            </div>

          </nav>
        </div>

        <div className='header-space'></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories, currencies: state.currencies, cart: state.cart };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (categories) => dispatch(getCategories(categories)),
    getCurrencies: (currencies) => dispatch(getCurrencies(currencies)),
    setCurrency: (currency) => dispatch(setCurrency(currency))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
