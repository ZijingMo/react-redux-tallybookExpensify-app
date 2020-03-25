import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

// Setting some global variables in this file 
// Applying 'beforeEach()' method to define mock function, root node render (shallow) 
let editExpense, history, wrapper, removeExpense;
beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
  <EditExpensePage 
    editExpense={editExpense} 
    removeExpense ={removeExpense}
    history={history}
    expense={expenses[1]}
  />);
}); 

test('should render EditExpensePage', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle action editExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(editExpense).toHaveBeenLastCalledWith(expenses[1].id, expenses[1]);
});

test('should handle action removeExpense', () => {
  wrapper.find('button').simulate('click');
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(removeExpense).toHaveBeenLastCalledWith({
    id: expenses[1].id
  });
});

