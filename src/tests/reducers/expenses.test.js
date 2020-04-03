import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

// Test the default state without any action
test('should set default state', () => {
  const state = expensesReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
});

// Test the actions
// Action 'Remove Expense' 
// Remove the second data in array 'expenses' 
test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

// Remove the data which doesn't exist in the array 'expenses'
test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'xyd883'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// Add the data to array 'expenses'
test('should add expense', () => {
  const testExpense = {
    id: 'jhe640',
    description: 'Gaming',
    note: '',
    amount: 6000,
    createAt: 328530
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense: testExpense
  };
  const state = expensesReducer(expenses, action); 
  expect(state).toEqual([...expenses, testExpense]); //Applying es6 'spread' to add object 'testExpense' to given array 'expenses' 
});

// Edit the data for an expense in array 'expenses'
test('should edit an expense by id', () => {
  const note = 'this is the testing change';
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      note
    }
  };
  const state = expensesReducer(expenses, action);
  // After reducer 'expensesReducer' running, the state has been edited.
  // As a result, state[0] means the edited pattern of given array 'expenses[0]' 
  expect(state[0].note).toBe(note);
});

// Edit the data for an expense not in array 'expenses'
test('should not edit an expense by id', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'pol422',
    updates: {
      amount: 7320
    }
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const testExpense = expenses[0];
  const action = {
    type: 'SET_EXPENSES',
    expenses: testExpense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses[0]);
});




