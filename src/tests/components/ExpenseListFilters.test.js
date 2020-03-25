import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

// Setting some global variables in this file 
// Applying 'beforeEach()' method to define mock function, root node render (shallow) 
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  // All actions and data for component 'ExpenseListFilters' are subscribed to this wrapper
  wrapper = shallow(
  <ExpenseListFilters 
    filters={filters} // This filters are imported from dummy data, default one
    setTextFilter={setTextFilter}
    sortByDate = {sortByDate}
    sortByAmount = {sortByAmount}
    setStartDate = {setStartDate}
    setEndDate = {setEndDate}
  />
  );
});


test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alternative data correctly', () => {
  // Method setProps() sets the props of the root component, and re-renders. 
  // Useful for when you are wanting to test how the component behaves over time with changing props. 
  // Calling this, for instance, will call the componentWillReceiveProps lifecycle method.
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle action text change', () => {
  const value = 'Corona Test';
  wrapper.find('input').simulate('change', {
    target: { value }
  });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
  const value = 'date';
  // Change to another dummy data 'altFilters'
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const value = 'amount';
  wrapper.find('select').simulate('change', {
    target: { value }
  });
  expect(sortByAmount).toHaveBeenCalled();
});

// Returns the prop value for the root node of the wrapper with the provided key. 
// It must be a single-node wrapper.
test('should handle action date changes', () => {
  const startDate = moment(0).add(8, 'months');
  const endDate = moment(0).add(50, 'years');
  wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle action date focus changes', () => {
  const calendarFocused = 'endDate';
  wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
  expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});


