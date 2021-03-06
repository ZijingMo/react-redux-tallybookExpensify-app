import uuid from 'uuid';
import database from '../firebase/firebase';

// These are 'Action Creators' down below (addExpense, removeExpense, editExpense, setExpenses)
// Action creators are exactly that—functions that create actions. 
// They usually return JS objects

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
});

// Dispatch the action 'addExpense'
// This function is able to return another function, since method 'applyMiddleware()' has been setup.
// Checking 'configureStore.js' to see the definition of 'applyMiddleware()' and 'thunk'
// Returning function helps us send the data to database 'firebase' 
export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '', 
      note = '', 
      amount = 0, 
      createAt = 0 
    } = expenseData;
    // Create an object for database connection 
    const expense = { description, note, amount, createAt }
    // One more return here is for jest test (the logic here is promise() chaining)
    return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
        dispatch(addExpense({
          id: ref.key,
          ...expense
        }));
    });
  };
};


// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
type: 'REMOVE_EXPENSE',
id
});

// Deleting data in database 'firebase'
export const startRemoveExpense = ( { id } = {}) => { 
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // Using firebase build-in function remove() to delete
    return database.ref(`users/${uid}/expenses/${id}`).remove()
           .then(() => {
             dispatch(removeExpense({ id }));
           });
  };
};


// EDIT_EXPENSE
// For these two arguments, 'id' is a string number an 'updates' is an object
export const editExpense = (id, updates) => ({
type: 'EDIT_EXPENSE',
id,
updates
});

// Editing data in database 'firebase'
export const startEditExpenses = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    // Using firebase build-in function update() to edit the data
    return database.ref(`users/${uid}/expenses/${id}`).update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// Fetching data from database 'firebase'
export const startSetExpenses = () => {
  return(dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenses`)
      .once('value')
      .then((snapshot) => {
        const fetchingData = [];
        snapshot.forEach((childSnapshot) => {
          fetchingData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setExpenses(fetchingData));
      });
  };
};

