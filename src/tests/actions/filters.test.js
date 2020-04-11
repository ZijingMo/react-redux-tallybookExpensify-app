import moment from 'moment';
import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

test('should generate set text filter action object with test value', () => {
  const action = setTextFilter('somethingSpecial');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'somethingSpecial'
  });
});

test('should generate set text filter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});

test('should generate sort by amount action object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT'
  });
});

test('should generate sort by date action object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE'
  });
});

test('should generate set start date action object', () => {
  const action = setStartDate(moment(10000));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    startDate: moment(10000)
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(20000));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    endDate: moment(20000)
  });
});
