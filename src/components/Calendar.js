import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';

const moment = extendMoment(Moment);

export const Header = (props) => {
  let visibleDate = moment({y: props.year, M:props.month, d: 1})
  return (
  <thead>
    <tr>
      <th onClick={props.onPrevious} colSpan={1} className="prev" ><input type="button" value="«"/></th>
      <th colSpan="5" className="datepicker-switch">{visibleDate.format('MMMM YYYY')}</th>
      <th onClick={props.onNext} colSpan="1" className="next" ><input type="button" value="»"/></th>
    </tr>
    <tr>
      <th colSpan="1" className="dow" >SU</th>
      <th colSpan="1" className="dow" >MO</th>
      <th colSpan="1" className="dow" >TU</th>
      <th colSpan="1" className="dow" >WE</th>
      <th colSpan="1" className="dow" >TH</th>
      <th colSpan="1" className="dow" >FR</th>
      <th colSpan="1" className="dow" >SA</th>
    </tr>
  </thead>
  )
}

export const CalendarDays = (props) => {
  let visibleDate = props.visibleDate
  let selectedDate = props.selectedDate
  let startOfMonth = visibleDate.clone().startOf('month')
  let startDate = (startOfMonth.day() === 0) ? startOfMonth.clone().weekday(-7) : startOfMonth.clone().startOf('week')
  let endDate = startDate.clone().add(41, 'days')
  let range = moment.range(startDate, endDate)
  let tdHtmlClass = ''
  let dates = Array.from(range.by('day')).map((dt) => { 
    if(dt.isBefore(visibleDate, 'month')){
      tdHtmlClass = 'day old'
    }else if(dt.isAfter(visibleDate, 'month')){
      tdHtmlClass = 'day new'
    }else if(dt.isSame(selectedDate, 'day')){
      tdHtmlClass = 'day active'
    }else{
      tdHtmlClass = 'day'
    }
    return(
      <td key={dt.format('DD-MM')} className={tdHtmlClass} value={dt}>
        {dt.format('DD')}
      </td>
    )
  })

  return (
    <tbody>
    {
      _.chain(dates)
      .chunk(7)
      .map((arr, index)=><tr key={index}>{arr}</tr>)
      .value()
    }
    </tbody>
  )
} 

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = (props.selectedDate ? moment(props.selectedDate) : moment()).startOf('day');
    this.state = {
      selectedDate: selectedDate,
      selectedMonth: selectedDate.clone().startOf('month'),
      visibleDate: selectedDate
    };
  }

  previous() {
    let previousMonth = this.state.selectedMonth.clone().subtract(1,'months')
    this.setState({
      selectedMonth: previousMonth,
      visibleDate: previousMonth.clone().startOf('month')
    });
  }
  
  next() {
    let nextMonth = this.state.selectedMonth.clone().add(1,'months')
    this.setState({
      selectedMonth: nextMonth,
      visibleDate: nextMonth.clone().startOf('month')
    });
  }
 

  render() {
    return(
      <div>
        <label>{this.props.name}</label>
        <table className="table-condensed">
          <Header year={this.state.visibleDate.year()} month={this.state.visibleDate.month()} onPrevious={this.previous.bind(this)} onNext={this.next.bind(this)}/>
          <CalendarDays visibleDate={this.state.visibleDate} selectedDate={this.state.selectedDate} />
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