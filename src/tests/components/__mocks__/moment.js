// To control dynamic change of function
const moment = require.requireActual('moment');

export default (timestamp = 0) => {
  return moment(timestamp);
};