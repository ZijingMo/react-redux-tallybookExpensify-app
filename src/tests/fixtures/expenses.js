import moment from 'moment';


// Testing data array
export default [{
  id: 'axz342',
  description: 'Candy',
  note: '',
  amount: 214,
  createAt: 0
}, {
  id: 'opi945',
  description: 'Gas',
  note: '',
  amount: 2612,
  // It supposes that the created time is 4 months before 01/01/1970, from moment.js documentation
  createAt: moment(0).subtract(4, 'months').valueOf()
}, {
  id: 'uil586',
  description: 'Credit',
  note: '',
  amount: 20000,
  // It supposes that the created time is 2 days after 01/01/1970, from moment.js documentation
  createAt: moment(0).add(2, 'days').valueOf()
}];