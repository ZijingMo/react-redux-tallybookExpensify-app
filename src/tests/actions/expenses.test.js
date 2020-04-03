import configureMockStore from 'redux-mock-store'; // A mock store for testing Redux async action creators and middleware.
import thunk from 'redux-thunk'; // Allows you to write action creators that return a function instead of an action
import { startAddExpense, addExpense, editExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses'; // import dummy data
import database from '../../firebase/firebase'; // import firebase to check the id

const createMockStore = configureMockStore([thunk]);

// Jest-Function: beforeEach()
// Runs a function before each of tests in this file run
// Uploads the data from fixture file 'expenses' to test firebase
beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createAt }) => {
    expensesData[id] = { description, note, amount, createAt }
  });
  database.ref('expenses').set(expensesData).then(() => done());
});


test('should setup remove expense action', () => {
  const action = removeExpense( {id: 'sdad3232323ee'} );
  // toEqual() goes over the array or object and asserts that all of the properties are the same
  // At the console of chrome, {} is not equal to {} (The return value of'{} === {}' is false)
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 'sdad3232323ee'
  });
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    // The first 'expect()'
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    // To avoid endless callback functions
    // Returns a value to help us using promise() methods
    return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
      // The second 'expect()'
      // The method 'toBeFalsy' is a jest function. 
      // In JavaScript, there are six falsy values: false, 0, '', null, undefined, and NaN.
      expect(snapshot.val()).toBeFalsy();
      done();
  })
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

// Two tests down below with firebase for action 'add expense'
// Applying method done() to save time for asynchronous
// The first test case
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
    // Checking file '../actions/expenses.js', the definition of action 'ADD_EXPENSE', we only need to test the first action 
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

// The second test case
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


test('should setup setExpenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

// One test down below with firebase for action 'set expenses'
test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
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

