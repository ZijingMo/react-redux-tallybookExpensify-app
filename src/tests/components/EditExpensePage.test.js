import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// Setting some global variables in this file 
// Applying 'beforeEach()' method to define mock function, root node render (shallow) 
let startEditExpenses, history, wrapper, startRemoveExpense;
beforeEach(() => {
  startEditExpenses = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
  <EditExpensePage 
    startEditExpenses={startEditExpenses} 
    startRemoveExpense ={startRemoveExpense}
    history={history}
    expense={expenses[1]}
  />);
}); 

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle action startEditExpenses', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpenses).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle action startRemoveExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[1].id
  });
});

