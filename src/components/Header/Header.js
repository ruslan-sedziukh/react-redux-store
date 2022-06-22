import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from './cart.svg';
import arrow from './arrow.svg';
import logo from './Brand icon.svg';
import { connect } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice.js';
import { getCurrencies } from '../../store/currenciesSlice.js';


class Header extends React.Component {
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
        // console.log('>>> categories: ');
        // console.log(currencies);
        this.props.getCurrencies(currencies);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCategories();
    this.getCurrencies();
  }

  render() {
    const links = [];

    for (let category in this.props.categories) {
      links.push(<NavLink to={'/category/' + category}>{category}</NavLink>);
    };

    const jjj = 0;

    return (
      <div className='header-container'>
        <div className='header'>
          <nav className='header-nav'>

            <div className='header-nav-left'>
              {links}
            </div>

            <img src={logo} className='header-nav-logo' />

            <div className='header-nav-right'>

              <div className='header-nav-currency-div'> 

                <span className='header-nav-currency'>
                  $<img src={arrow} className='header-nav-currency-arrow header-nav-currency-arrow-down' />
                </span>

                {jjj ? 'Heal yeah' : ''}

              </div>

              <div className='header-nav-right-cart-div'>
                <img src={cart} alt='Cart image' className='header-nav-cart' />
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
  return { categories: state.categories, currencies: state.currencies };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: (categories) => dispatch(getCategories(categories)),
    getCurrencies: (currencies) => dispatch(getCurrencies(currencies))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
