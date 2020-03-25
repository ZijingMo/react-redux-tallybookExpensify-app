import React from 'react';
import { Link } from 'react-router-dom';

// Destructuring the object to 'dispatch', 'id', 'description', 'amount', 'createAt'
// The component is injected to the 'dispatch' function when we use connect() hoc to wrap it up
const ExpenseListItem = ({ id, description, amount, createAt }) => (
  <div>
    {/* Import 'Link' component to redirect edit page */}
    <Link to={`/edit/${id}`}>
       <h2> { description } </h2> 
    </Link>
    <p> {amount} - {createAt} </p>
  </div>
);

export default ExpenseListItem; 