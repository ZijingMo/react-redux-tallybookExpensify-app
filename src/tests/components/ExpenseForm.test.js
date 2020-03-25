import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render component ExpenseForm correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render component ExpenseForm with dummy data expense correctly', () => {
  const wrapper = shallow(<ExpenseForm expense = {expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid from submission', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  // For the second argument of 'simulate' method, we need an object at first
  // In this object, create a property named 'preventDefault' as an arrow function
  // This arrow function is able to avoid the error from jest test
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  // The length of error will be greater than 0 if error exist
  expect(wrapper.state('error').length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
  const value = 'Testing Description';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
  const value = 'Testing Note';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('textarea').simulate('change', {
    target:  { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should set amount if valid input', () => {
  const value = '13.75';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target:  { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if invalid input', () => {
  const value = '73.2198';
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('input').at(1).simulate('change', {
    target:  { value }
  });
  expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
  // Creat a mock (fake) function to spy on the behavior of the function
  const onSubmitSpy = jest.fn();
  // Simulate the behavior
  const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>); 
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });

  expect(wrapper.state('error')).toBe('');
  // Skip the property 'id' for avoiding error
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[2].description,
    amount: expenses[2].amount,
    note: expenses[2].note,
    createAt: expenses[2].createAt
  });
});

test('should set new date on date change', () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find('SingleDatePicker').prop('onDateChange')(now);
  expect(wrapper.state('createAt')).toEqual(now);
});

// test('should set calendar focus on change', () => {
//   const focused = true;
//   const wrapper = shallow(<ExpenseForm />);
//   wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
//   expect(wrapper.state('calendarFocused')).toBe(focused);
// });

