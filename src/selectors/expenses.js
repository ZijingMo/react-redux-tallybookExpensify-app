import moment from 'moment';

// Get visible expenses
// First parameter is only object 'expenses', no destruction
// Second parameter destructs the property from object 'filter'
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const createAtMoment = moment(expense.createAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createAt < b.createAt ? 1 : -1 // It means the most recent created date shows on the top
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? 1 : -1 // It means the most expensive amount shows on the top
    }
  });
}

export default getVisibleExpenses;