import moment from 'moment';

// Default
const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

// Alternative 
const altFilters = {
  text: 'rent',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'years')
};

export { filters, altFilters };