import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';
// Testing condition:
// Range: 'text' property contains letter 'c' whatever upper- or lowercase
// Ordered: most recent date
test('should filter by text value', () => {
  const filters = {
    text: 'c',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]]);
});

// Testing condition:
// Range: Any date begins at 01/01/1970 
// Ordered: most recent date to 01/01/1970
test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0]])
});

// Testing condition:
// Range: Any date until 01/02/1970
// Ordered: most recent date to 01/02/1970
test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(1, 'days')
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1]]);
});

// Testing condition:
// Ordered by: the most recent date from array 'expense'
test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

// Testing condition:
// Ordered by: the most expensive cost from array 'expense'
test('should sort by amount', () => {
  const filters = {
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  };
  const result = getVisibleExpenses(expenses, filters);
  expect(result).toEqual([expenses[2], expenses[1], expenses[0]]);
});

