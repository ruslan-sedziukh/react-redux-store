import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from './cart.svg';
import arrow from './arrow.svg';
import logo from './Brand icon.svg';

class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <nav className='header-nav'>
          <div className='header-nav-left'>
            <NavLink to='/all'>
              ALL 
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
      </header>
    );
  }
}

export default Header;