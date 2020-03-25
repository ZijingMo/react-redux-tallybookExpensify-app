import moment from 'moment';
import filtersReducer from '../../reducers/filters';

// Test the default state without any action
test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});


// Test the actions
// Action 'Sort By Amount'
test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

// Action 'Sort By Date'
test('should set sortBy to date', () => {
  // Create a new state which property 'sortBy' is amount, then test if the action 'SORT_BY_DATE' works or not 
  const currentState = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('date');
});

// Action 'Set Text Filter'
test('should set text filter', () => {
  const text = 'This is the test';
  // It follows setTextFilter() method in '../actions/filters.js' file
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe('This is the test');
});

// Action 'Set StartDate Filter'
test('should set startDate filter', () => {
  const startDate = moment(0); // 01/01/1970
  const action = {
    type: 'SET_START_DATE',
    startDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(moment(0));
});

// Action 'Set endDate Filter'
test('should set endDate filter', () => {
  const endDate = moment().endOf('months'); // last date of this month
  const action = {
    type: 'SET_END_DATE',
    endDate
  };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(moment().endOf('months'));
});









