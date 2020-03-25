import React from 'react';
//import { Link } from 'react-router-dom';
import { shallow } from 'enzyme';
import ExpenseListItem  from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses'; // This is some dummy data


test('should render ExpenseListItem with expenses', () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
  // The meaning of spread '...expenses[0]': 
  // 1. this dummy data has 3 objects in the array, as a result, '{...expenses}' is able to disassemble this dummy data into 3 separately arguments for the component 
  // 2. I chose the first object to test so it looks like '...expenses[0]' 
  expect(wrapper).toMatchSnapshot();
});