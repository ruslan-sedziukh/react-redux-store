import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from './cart.svg';
import arrow from './arrow.svg';
import logo from './Brand icon.svg';
import { connect } from 'react-redux';
import { getCategories } from '../../store/categoriesSlice.js';


class Header extends React.Component {

  // =====================
  //
  // Test for dispatch addCategorie
  // constructor(props) {
  //   super(props);
  //   this.onClick = this.onClick.bind(this);
  // }

  // This also just for a test
  // onClick () {
  //   this.props.addCategorie('new');
  //   // alert('hello');
  // } 

  // Should add 
  // onClick={this.onClick} to logo img 
  //
  //======================


  async getCategories() {
    // console.log('Call getCategories');
    try {
      const response = await fetch('http://localhost:4000/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "query" : "query { categories { name } }"
        })
      });
      if(response.ok) {
        const data  = await response.json();
        // console.log('Fetch work!');
        // console.log(data.data.categories);

        // !!! Add categories to store here !!!
        const categories = {};
        data.data.categories.forEach(category => {
          categories[(category.name)] = {};
        })
        this.props.getCategories(categories);
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const links = [];
    // console.log('>>>>>>>>>>');
    // console.log(this.props);

    for(let category in this.props.categories) {
      links.push(<NavLink to={'/category/' + category}>{category}</NavLink>);
    };

    return (
      <div>
        <div className='header'>
        <nav className='header-nav'>
          <div className='header-nav-left'>
            {links}
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

      <div className='header-space'></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.categories };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    getCategories: (category) => dispatch(getCategories(category))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
