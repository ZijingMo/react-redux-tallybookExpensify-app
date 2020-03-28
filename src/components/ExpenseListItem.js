import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'; // Timestamp format change
import numeral from 'numeral'; // Expense format change

// Destructuring the object to 'dispatch', 'id', 'description', 'amount', 'createAt'
// The component is injected to the 'dispatch' function when we use connect() hoc to wrap it up
const ExpenseListItem = ({ id, description, amount, createAt }) => (
  <div>
    {/* Import 'Link' component to redirect edit page */}
    <Link to={`/edit/${id}`}>
       <h2> { description } </h2> 
    </Link>
    <p> 
      {numeral(amount / 100).format('$0,0.00')} 
      - 
      {moment(createAt).format('MMMM Do, YYYY (ddd)')} 
    </p>
  </div>
);

export default ExpenseListItem; 