import React, { Component } from 'react'
import moment from 'moment';
import { Days } from './Days';


export class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = props.selectedDate ? moment(props.selectedDate) : moment();
    let firstDayOfMonth = moment(selectedDate).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.state = {
      selectedDate: selectedDate,
      firstSunday: firstSunday,
      selectedMonth: selectedDate.startOf('month')
    };
  }
  previous() {
    let selectedDate = this.state.selectedMonth.subtract(1,'months')
    let firstDayOfMonth = moment(selectedDate).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.setState({
      firstSunday: firstSunday,
      selectedMonth: selectedDate
    });
  }
  next() {
    let selectedDate = this.state.selectedMonth.add(1,'months')
    let firstDayOfMonth = moment(selectedDate).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.setState({
      firstSunday: firstSunday,
      selectedMonth: selectedDate
    });
  }
  render() {

    return(
      <div>
        <label>{this.props.name}</label>
        <table class="table-condensed">
          <thead>
            <tr>
              <th onClick={this.previous.bind(this)} className="prev">«</th>
              <th colspan="5" className="datepicker-switch">{this.state.selectedMonth.format('MMMM YYYY')}</th>
              <th onClick={this.next.bind(this)} className="next">»</th>
            </tr>
            <tr>
              <th class="dow">Su</th>
              <th class="dow">Mo</th>
              <th class="dow">Tu</th>
              <th class="dow">We</th>
              <th class="dow">Th</th>
              <th class="dow">Fr</th>
              <th class="dow">Sa</th>
            </tr>
          </thead>
          <Days currentState={this.state}/>
        </table>
      </div>
    );
  }
}

export default Calendar;


// export class Calendar extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <label>hi</label>
//   }
// }
