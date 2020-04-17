import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'; 

// Destruct the object 'startLogout', which is a function  
export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__contentStyle">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify - A Tally Book</h1>
        </Link>
        <button className="button--link" onClick = {startLogout}> Logout </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

// It is not necessary to connect to the state, so the first argument is undefined 
export default connect(undefined, mapDispatchToProps)(Header);