import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';

const moment = extendMoment(Moment);

export const Header = (props) => {
  let {year, month, onPrevious, onNext, onChangeView, currentView, ...otherProps} = props
  let visibleDate = moment({y: year, M:month, d: 1})
  let dayLabels = () => {
    if(currentView == 'dates')
      return(<tr>
        <th colSpan="1" className="dow" >SU</th>
        <th colSpan="1" className="dow" >MO</th>
        <th colSpan="1" className="dow" >TU</th>
        <th colSpan="1" className="dow" >WE</th>
        <th colSpan="1" className="dow" >TH</th>
        <th colSpan="1" className="dow" >FR</th>
        <th colSpan="1" className="dow" >SA</th>
      </tr>)
    else{
      return null
    }
  }

  return (
    <thead>
      <tr>
        <th onClick={onPrevious} colSpan={1} className="prev" ><input type="button" value="«"/></th>
        <th colSpan="5" onClick={onChangeView} className="datepicker-switch">{visibleDate.format('MMMM YYYY')}</th>
        <th onClick={onNext} colSpan="1" className="next" ><input type="button" value="»"/></th>
      </tr>
      {
        dayLabels()
      }
    </thead>
  )
}

export const CalendarDays = (props) => {
  let {visibleDate, selectedDate, ...otherProps} = props
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

export const CalendarMonths = (props) => {
  let {visibleDate, selectedDate, ...otherProps} = props
  let calculateClass = monthName => ((selectedDate.format('MMM') === monthName) ? 'month active' : 'month')
  return(
    <tbody>
      <tr>
        <td colSpan={7}>
          <span className={calculateClass('Jan')}>Jan</span>
          <span className={calculateClass('Feb')}>Feb</span>
          <span className={calculateClass('Mar')}>Mar</span>
        </td>
      </tr>
      <tr>
        <td colSpan={7}>
          <span className={calculateClass('Apr')}>Apr</span>
          <span className={calculateClass('May')}>May</span>
          <span className={calculateClass('Jun')}>Jun</span>
        </td>
      </tr>
      <tr>
        <td colSpan={7}>
          <span className={calculateClass('Jul')}>Jul</span>
          <span className={calculateClass('Aug')}>Aug</span>
          <span className={calculateClass('Sep')}>Sep</span>
        </td>
      </tr>
      <tr>
      <td colSpan={7}>
          <span className={calculateClass('Oct')}>Oct</span>
          <span className={calculateClass('Nov')}>Nov</span>
          <span className={calculateClass('Dec')}>Dec</span>
        </td>
      </tr>
    </tbody>
  )
}

export const CalendarYears = (props) => {
  let {visibleDate, selectedDate, ...otherProps} = props
  let selectedYear = selectedDate.year()
  let activeYear = visibleDate.year()
  let startOfDecade = activeYear - (activeYear % 10)
  let spanHtmlClass = ''
  let years = _.range(startOfDecade -1, startOfDecade + 11).map((yr, index) => {
    if(yr < startOfDecade){
      spanHtmlClass = 'year old'
    }else if(yr < startOfDecade + 10){
      spanHtmlClass = (selectedYear === yr) ? 'year active' : 'year'
    }else{
      spanHtmlClass = 'year new'
    }
    return(<span key={index} className={spanHtmlClass}>{yr}</span>)
  })
  return(
    <tbody>
    {
      _.chain(years)
      .chunk(4)
      .map((arr, index) => <tr key={index}><td colSpan={7} key={index}>{arr}</td></tr>)
      .value()
    }
    </tbody>
  )
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = (props.selectedDate ? moment(props.selectedDate) : moment()).startOf('day');
    let currentView = props.currentView ? props.currentView : 'dates'
    this.state = {
      selectedDate: selectedDate,
      selectedMonth: selectedDate.clone().startOf('month'),
      visibleDate: selectedDate,
      currentView: currentView
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
 
  changeView() {
    let viewToBeChanged = ''
    switch(this.state.currentView){
      case 'dates':
        viewToBeChanged = 'months'
        break;
      case 'months':
        viewToBeChanged = 'years'
        break;
      default:
        viewToBeChanged = 'years'
    }
    this.setState({
      currentView: viewToBeChanged
    })
  }

  render() {
    return(
      <div>
        <label>{this.props.name}</label>
        <table className="table-condensed">
          <Header 
            year={this.state.visibleDate.year()} 
            month={this.state.visibleDate.month()} 
            onPrevious={this.previous.bind(this)} 
            onNext={this.next.bind(this)}
            onChangeView={this.changeView.bind(this)}
            currentView={this.state.currentView}
          />
          {{
            'months':(
              <CalendarMonths visibleDate={this.state.visibleDate} selectedDate={this.state.selectedDate}/>
            ),
            'years':(
              <CalendarYears visibleDate={this.state.visibleDate} selectedDate={this.state.selectedDate}/>
            ),
            'dates':(
              <CalendarDays visibleDate={this.state.visibleDate} selectedDate={this.state.selectedDate} />
            )
          }[this.state.currentView || 'dates']}
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