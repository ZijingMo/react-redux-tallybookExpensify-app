import configureMockStore from 'redux-mock-store'; // A mock store for testing Redux async action creators and middleware.
import thunk from 'redux-thunk'; // Allows you to write action creators that return a function instead of an action
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses'; // import dummy data
import database from '../../firebase/firebase'; // import firebase to check the id

const createMockStore = configureMockStore([thunk]);

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
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1]
  }); 
});

// Two new tests with firebase
// Applying method done() to save time for asynchronous
test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'iPhone11',
    amount: 107500,
    note: 'April Fool Gift',
    createAt: 382739231
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions(); // This is going to return all actions as an array
    // Checking file '../actions/expenses.js', we only need to test the first action 
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        // Since the 'id' is a dynamic data, applying 'expect.any()' only checks the property, which is 'id'.
        id: expect.any(String),
        ...expenseData
      }
    });
    // Checking id
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
  });
});

test('should add expenses with default to database and store', (done) => {
  const store = createMockStore({});
  const defaultData = {
    description: '',
    amount: 0,
    note: '',
    createAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions(); // This is going to return all actions as an array
    // Checking file '../actions/expenses.js', we only need to test the first action 
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        // Since the 'id' is a dynamic data, applying 'expect.any()' only checks the property, which is 'id'.
        id: expect.any(String),
        ...defaultData
      }
    });
    // Checking id
    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
      expect(snapshot.val()).toEqual(defaultData);
      done();
  });
});


//  // This is for no database test
// test('should setup add expense action object with default value', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       // Since the 'id' is a dynamic data, applying 'expect.any()' only checks the type of 'id'.
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createAt: 0
//     }
//   });
// });

