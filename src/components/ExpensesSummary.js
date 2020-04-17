import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ( { expenseCount, expensesTotal } ) => {
  // Format change about word 'expense' and 'expenses'
  const SingularAndPluralChange = expenseCount === 1 || !expenseCount ? 'expense' : 'expenses';
  // Format change from number to money counting
  const formattedExpense = numeral(expensesTotal / 100).format('$0,0.00');
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Hmm.. You have <span>{expenseCount}</span> {SingularAndPluralChange}, and the total is <span>{formattedExpense}</span> </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters);

  return {
    // After filtering from method 'getVisibleExpenses()', the amount of objects in this array could be regarded as the count
    expenseCount: VisibleExpenses.length,
    expensesTotal: getExpensesTotal(VisibleExpenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);