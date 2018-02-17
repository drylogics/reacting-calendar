import React, { Component } from 'react'
import moment from 'moment';
import { Days } from './Days';
import { Months } from './Months';
import { Years } from './Years';


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
      container: 'days',
      increaser: 1,
      increaserName: 'months',
      selectedMonth: selectedDate.startOf('month'),
      datepickerLabel: selectedDate.format('MMMM YYYY')
    };
  }

  changeState() {
    if (this.state.container == 'days'){
      this.setState({
        container: 'months',
        increaser: 1,
        increaserName: 'years',
        datepickerLabel: (this.state.selectedMonth.format('YYYY'))
      });
    } else if (this.state.container == 'months') {
      this.setState({
        container: 'years',
        increaser: 12,
        increaserName: 'years',
        datepickerLabel: (this.state.selectedMonth.clone().subtract(8,'years').format('YYYY') + "  –  " + this.state.selectedMonth.clone().add(1,'years').format('YYYY'))
      });
    } else {
      this.setState({
        container: 'years',
      });
    }
  }

  previous() {
    let selectedDate = this.state.selectedMonth.subtract(parseInt(this.state.increaser),this.state.increaserName)
    let firstDayOfMonth = moment(selectedDate).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.setState({
      firstSunday: firstSunday,
      datepickerLabel: selectedDate.format('MMMM YYYY'),
      selectedMonth: selectedDate
    });
  }
  next() {
    let selectedDate = this.state.selectedMonth.add(parseInt(this.state.increaser),this.state.increaserName)
    let firstDayOfMonth = moment(selectedDate).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.setState({
      firstSunday: firstSunday,
      datepickerLabel: selectedDate.format('MMMM YYYY'),
      selectedMonth: selectedDate
    });
  }
  render() {
    let container = this.state.container
    let allProps = this.state
    function Greeting() {
      if (container == 'days') {
        return <Days currentState={allProps}/>
      } else if (container == 'months') {
        return <Months currentState={allProps}/>
      } else {
        return <Years currentState={allProps}/>
      }

    }
    return(
      <div>
        <label>Start Date:</label>
        <table class="table-condensed">
          <thead>
            <tr>
              <th onClick={this.previous.bind(this)} className="prev">«</th>
              <th onClick={this.changeState.bind(this)} className="datepicker-switch">{this.state.datepickerLabel}</th>
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
          <Greeting />
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
