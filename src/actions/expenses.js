import uuid from 'uuid'

// These are the 'action' objects down below

// ADD_EXPENSE
export const addExpense = (
  { 
  description = '', 
  note = '', 
  amount = 0, 
  createAt = 0 
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createAt
  }
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
type: 'REMOVE_EXPENSE',
id
});

// EDIT_EXPENSE
// For the arguments, 'id' is a string number an 'updates' is an object
export const editExpense = (id, updates) => ({
type: 'EDIT_EXPENSE',
id,
updates
});