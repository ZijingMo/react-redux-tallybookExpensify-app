import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth'; 

// Destruct the object 'startLogout', which is a function  
export const Header = ({ startLogout }) => (
  <header>
    <h1>A Tally Book: Expensify</h1>
    <NavLink to="/dashboard" activeClassName="is-active" > Dashboard </NavLink>
    <NavLink to="/create" activeClassName="is-active"> Create Expense </NavLink>
    <button onClick = {startLogout}> Logout </button>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

// It is not necessary to connect to the state, so the first argument is undefined 
export default connect(undefined, mapDispatchToProps)(Header);