import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = props.selectedDate ? moment(props.selectedDate) : moment();
    this.state = {
      selectedDate: selectedDate,
      selectedMonth: selectedDate.clone().startOf('month')
    };
  }
  previous() {
    this.setState({
      selectedMonth: this.state.selectedMonth.clone().subtract(1,'months')
    });
  }
  
  next() {
    this.setState({
      selectedMonth: this.state.selectedMonth.add(1,'months')
    });
  }

  calendarDays(activeDate) {
    let startOfMonth = activeDate.clone().startOf('month')
    let startDate = (startOfMonth.day() === 0) ? startOfMonth.clone().weekday(-7) : startOfMonth.clone().startOf('week')
    let endDate = startDate.clone().add(41, 'days')
    let range = moment.range(startDate, endDate)
    let tdHtmlClass = ''
    return Array.from(range.by('day')).map((dt) => { 
      if(dt.isBefore(activeDate, 'month')){
        tdHtmlClass = 'day old'
      }else if(dt.isAfter(activeDate, 'month')){
        tdHtmlClass = 'day new'
      }else if(dt.isSame(activeDate, 'day')){
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

  } 

  render() {
    return(
      <div>
        <label>{this.props.name}</label>
        <table className="table-condensed ">
          <thead>
            <tr>
              <th colSpan={1} onClick={this.previous.bind(this)} className="prev" ><input type="button" value="«"/></th>
              <th colSpan="5" className="datepicker-switch">{this.state.selectedMonth.format('MMMM YYYY')}</th>
              <th colSpan="1"onClick={this.next.bind(this)} className="next" ><input type="button" value="»"/></th>
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
          <tbody>
            <tr>{this.calendarDays(moment())}</tr>
          </tbody>
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