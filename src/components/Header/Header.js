import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from './cart.svg';
import arrow from './arrow.svg';
import logo from './Brand icon.svg';
import { connect } from 'react-redux';


class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <nav className='header-nav'>
          <div className='header-nav-left'>
            <NavLink to='/all'>
              {this.props.categories} 
            </NavLink>
            <NavLink to='/clothes'>
              CLOTHES
            </NavLink>
            <NavLink to='/tech'>
              TECH
            </NavLink>
          </div>
          <img src={logo} className='header-nav-logo'/>
          <div className='header-nav-right'>
            <span className='header-nav-currency'>$ <img src={arrow} className='header-nav-currency-arrow' /></span>
            <span>
              <img src={cart} alt='Cart image' className='header-nav-cart'/>
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

export default connect(mapStateToProps)(Header);

// export default Header;