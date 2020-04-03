import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

// Refactoring the code, from functional to class component:
// For jest test

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.editExpense(this.props.expense.id, expense);
    // This method leads to redirect to the expensify dashboard (Home-Page) when the user click the button 'Add Expense' 
    this.props.history.push('/');
    //console.log('updated', expense);
  };

  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <ExpenseForm
          expense = {this.props.expense} 
          onSubmit = {this.onSubmit}
        />
        <button 
          onClick = {this.onRemove}
        > 
            Remove 
        </button>
    </div>
    );
  }
}

// New component will subscribe to Redux store updates. 
// This means that any time the store is updated, mapStateToProps will be called. 
// The results of mapStateToProps must be a plain object, which will be merged into the component’s props.
const mapStateToProps = (state, props) => {
  return {
    // It is going to search the array 'expenses' (a lot of objects 'expense' form array 'expenses') in Redux store to match the updated expense the user input
    // 'expense.id' means the id of array 'expenses' in Redux store
    // 'prop.match.params.id' means the property 'id' of an updated object 
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
  };
};

// Every action creator wrapped into a dispatch call so they may be invoked directly, will be merged into the component’s props.
// Import actions (editExpense, removeExpense) from action folder and subscribe to prop in class 'EditExpensePage'
const mapDispatchToProps = (dispatch, props) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);



// Functional form as a reference

// const EditExpensePage = (props) => {
//   //console.log(props);
//   return (
//     <div>
//       <ExpenseForm
//         expense={props.expense} 
//         onSubmit={(expense) => {
//           // Dispatch the action to edit the expense and redirect to the dashboard
//           props.dispatch(editExpense(props.expense.id, expense));
//           props.history.push('/');
//           console.log('updated', expense);
//         }}
//       />
//       <button 
//         onClick={() => {
//           props.dispatch(removeExpense({id: props.expense.id})); //The argument of action function removeExpense() is an object
//           props.history.push('/');
//         }}
//       > 
//           Remove 
//       </button>
//     </div>
//   );
// };

