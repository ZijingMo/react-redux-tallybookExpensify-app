import getExpensesTotal from '../../selectors/expenses-total';
import moment from 'moment';
import expenses from '../fixtures/expenses';

const localExpenses = [
  {
    id: 'lld567',
    amount: 99,
    note: '',
    description: 'local expense',
    createAt: moment(0).add(200, 'days').valueOf()
  }
];

// Assumed no expense
test('should return 0 if no expenses', () => {
  const result = getExpensesTotal([]);
  expect(result).toBe(0);
});

// Assumed only one expense
test('should correctly add up a single expense', () => {
  const result = getExpensesTotal(localExpenses);
  expect(result).toBe(99);
});

// Assumed multiple expenses
// This data is imported from file 'fixtures'.  
test('should correctly add up multiple expenses', () => {
  const result = getExpensesTotal(expenses);
  expect(result).toBe(22826);
});