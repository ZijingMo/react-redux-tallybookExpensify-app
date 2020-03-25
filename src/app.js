import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import { addExpense } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

// Water Bill
const expense1 = store.dispatch(addExpense({ description: 'Water Bill', amount: 6500, createAt: -1000}));
// Gas Bill
let expense2 = store.dispatch(addExpense({ description: 'Gas Bill', amount: 5500, createAt: 1000000000000}));
// Rent
const expense3 = store.dispatch(addExpense({ description: 'Rent', amount: 10500}));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

console.log(store.getState());


const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));



