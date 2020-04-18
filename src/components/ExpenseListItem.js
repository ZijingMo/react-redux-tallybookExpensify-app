import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Timestamp format change
import numeral from 'numeral'; // Expense format change

/* Destructuring the object to 'dispatch', 'id', 'description', 'amount', 'createAt'
   The component is injected to the 'dispatch' function when we use connect() hoc to wrap it up
   Import 'Link' component to redirect edit page */

const ExpenseListItem = ({ id, description, amount, createAt }) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h2 className="list-item__title"> { description } </h2>    
      <span className="list-item__subtitle"> {moment(createAt).format('MMMM Do, YYYY (ddd)')} </span>
    </div>
    <h2 className="list-item__data"> 
      {numeral(amount / 100).format('$0,0.00')} 
    </h2> 
  </Link>
);

export default ExpenseListItem; 