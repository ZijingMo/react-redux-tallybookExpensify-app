import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

// Refactoring the code, from functional to class component:
// For jest test

export class AddExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.addExpense(expense);
    // This method leads to redirect to the expensify dashboard (Home-Page) when the user click the button 'Add Expense' 
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
          onSubmit = {this.onSubmit}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);