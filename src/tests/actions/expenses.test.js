import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action', () => {
  const action = removeExpense( {id: 'sdad3232323ee'} );
  // toEqual() goes over the array or object and asserts that all of the properties are the same
  // At the console of chrome, {} is not equal to {} (The return value of'{} === {}' is false)
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'sdad3232323ee'
  });
});

test('should setup edit expense action', () => {
  const action = editExpense('123abc', {note: 'testing', createAt:30000});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'testing',
      createAt: 30000 
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseDate = {
    description: 'Tuition',
    amount: 200000,
    createAt: 4333000,
    note: 'This is the first semester tuition'
  };
  const action = addExpense(expenseDate);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseDate,
      // Since the 'id' is a dynamic data, applying 'expect.any()' only checks the type of 'id'.
      id: expect.any(String)
    }
  }); 
});

test('should setup add expense action object with default value', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createAt: 0
    }
  });
});

