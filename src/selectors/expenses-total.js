
const getExpensesTotal = (expenses) => {
  let total = 0; 
  // Expenses doesn't exist or the length is equal to zero
  if (!expenses || expenses.length === 0) {
    return total;
  } else {
  // The method map() gets the property 'amount' out of each object in array. 
  // The method reduce(), like a for-loop, sums the number in every 'amount' up.
    return total = expenses
            .map((expense) => expense.amount)
            .reduce((total, amount) => total + amount, 0);
  };
};


export default getExpensesTotal;