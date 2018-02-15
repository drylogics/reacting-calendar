import React, { Component } from 'react'
import moment from 'moment';


export class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = props.selectedDate ? moment(props.selectedDate) : moment();
    this.state = {
      selectedDate: selectedDate,
      selectedMonth: selectedDate.startOf('month')
    };
  }
  previous() {
    this.setState({
      selectedMonth: this.state.selectedMonth.subtract(1,'months')
    });
  }
  next() {
    this.setState({
      selectedMonth: this.state.selectedMonth.add(1,'months')
    });
  }
  render() {

    return(
      <div>
        <label>{this.props.name}</label>
        <table class="table-condensed">
          <thead>
            <tr>
              <th onClick={this.previous.bind(this)} className="prev" style="visibility: visible;">«</th>
              <th colspan="5" className="datepicker-switch">{this.state.selectedMonth.format('MMMM YYYY')}</th>
              <th onClick={this.next.bind(this)} className="next" style="visibility: visible;">»</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

// export class Calendar extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <label>hi</label> 
//   }
// }