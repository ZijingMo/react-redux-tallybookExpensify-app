import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


//const now = moment();
//console.log(now.format("MMM Do, YYYY"));


// This state component creates an input form, date picker ,and a button for expense data record
export default class ExpenseForm extends React.Component {
  // Using the constructor function to access the expense data which has passed down.If not, the form just shows the default value
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createAt: props.expense ? moment(props.expense.createAt) : moment(),
      calenderFocused: false,
      error: ''
    };
  }
  // These two functions below control the change of input value. It binds the input value and event handlers 'onChange'.
  // If user input some value, property 'description' or 'note' in object 'state' will be updated
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  // This function applies the reg-expression to stipulate the format of amount input, which is any number.two-digit number in this case
  onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = (createAt) => {
    if (createAt) {
      this.setState(() => ({ createAt }));
    }
  };
  // Destructuring the object from singleDatePicker component
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calenderFocused: focused }));
  }; 
  // Submitting data to Redux state container and error control
  onSubmit = (e) => {
    // Prevent refreshing the page when user clicks the 'Add Expense' button
    e.preventDefault(); 
    if (!this.state.description || !this.state.amount) {
      // Set error state 
      this.setState(() => ({ error: 'Please provide descriptions and amount.' }));
    } else {
      // Clear the error
      this.setState(() => ({ error: '' }));
      // Add the form (user's input data) to Redux store as an object
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createAt: this.state.createAt.valueOf(),// Using 'moment' library's build-in function valueOf() to convert the time in Unix Timestamp mode (milliseconds)
        note: this.state.note
      });
    }
  };
  render () {
    return (
      <div> 
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <input 
            type = "text"
            placeholder ="Description"
            autoFocus
            value = {this.state.description}
            onChange = {this.onDescriptionChange}
          />
          <input 
            type = "text"
            placeholder = "Amount"
            value = {this.state.amount}
            onChange = {this.onAmountChange}
          />
          {/* Third party libraries' component to implement date-pick and calender select */}
          <SingleDatePicker 
            date={this.state.createAt}
            onDateChange={this.onDateChange}
            focused={this.state.calenderFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
            isDayHighlighted={() => true}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value = {this.state.note}
            onChange = {this.onNoteChange}
          >
          </textarea>
          <button>Add Expense</button>
        </form>
      </div>
    )
  }
}