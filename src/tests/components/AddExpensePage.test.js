import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

// Setting global some variables in this file 
// Applying 'beforeEach()' method to define mock function, root node render (shallow) 
let addExpense, history, wrapper;
beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);
}); 


test('should render AppExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
  // Import dummy data 'expenses[0]' to simulate the behavior 'onSubmit'
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(addExpense).toHaveBeenLastCalledWith(expenses[0]);
  //expect(wrapper).toMatchSnapshot();
});