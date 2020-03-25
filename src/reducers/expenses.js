// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id); // If the accessed id match state's id, that id is bye-bye
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }; //Spread syntax updates the state (keep unchanged value and change the fluctuating value)
        } else {
          return expense
        };
      }); 
    default: 
      return state;
  }
};

export default expensesReducer;