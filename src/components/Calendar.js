import React, { Component } from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import _ from 'lodash';
import './Calendar.css';

const moment = extendMoment(Moment);

export const Header = (props) => {
  let {visibleDate, onPrevious, onNext, onChangeView, currentView, showDaysLabel, ...otherProps} = props
  let headerText = () => {
    if(currentView == 'dates'){
      return visibleDate.format('MMMM YYYY')
    }else if(currentView == 'months'){
      return visibleDate.format('YYYY')
    }else{
      let year = visibleDate.year()
      let startOfDecade = year - (year % 10)
      return `${startOfDecade} - ${startOfDecade + 9}`
    }
  }

  let dayLabels = (<tr>
    <th colSpan="1" className="dow" >SU</th>
    <th colSpan="1" className="dow" >MO</th>
    <th colSpan="1" className="dow" >TU</th>
    <th colSpan="1" className="dow" >WE</th>
    <th colSpan="1" className="dow" >TH</th>
    <th colSpan="1" className="dow" >FR</th>
    <th colSpan="1" className="dow" >SA</th>
  </tr>)

  return (
    <thead>
      <tr>
        <th onClick={onPrevious} colSpan={1} className="prev" >«</th>
        <th colSpan="5" onClick={onChangeView} className="datepicker-switch">{headerText()}</th>
        <th onClick={onNext} colSpan="1" className="next" >»</th>
      </tr>
      { showDaysLabel ?  dayLabels : null }
    </thead>
  )
}

export const Days = props => {
  let {visibleDate, selectedDate, handleClick, ...otherProps} = props
  let startOfMonth = visibleDate.clone().startOf('month')
  let startDate = (startOfMonth.day() === 0) ? startOfMonth.clone().weekday(-7) : startOfMonth.clone().startOf('week')
  let endDate = startDate.clone().add(41, 'days')
  let range = moment.range(startDate, endDate)
  let tdHtmlClass = ''
  let dateString = ''
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
    dateString = dt.format('YYYY-MM-DD')
    return(
      <td key={dateString} onClick={handleClick} className={tdHtmlClass} id={dateString}>
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

export const Months = props => {
  let {visibleDate, selectedDate, handleClick, ...otherProps} = props
  let visibleYear = visibleDate.year()
  let selectedYear = selectedDate.year()
  let calculateClass = monthName => ((`${monthName} ${visibleYear}` === selectedDate.format('MMM YYYY')) ? 'month active' : 'month')

  return(
    <tbody>
      <tr>
        <td colSpan={7}>
          <span onClick={handleClick} className={calculateClass('Jan')} id={`${visibleYear}-01`}>Jan</span>
          <span onClick={handleClick} className={calculateClass('Feb')} id={`${visibleYear}-02`}>Feb</span>
          <span onClick={handleClick} className={calculateClass('Mar')} id={`${visibleYear}-03`}>Mar</span>
          <span onClick={handleClick} className={calculateClass('Apr')} id={`${visibleYear}-04`}>Apr</span>
        </td>
      </tr>
      <tr>
        <td colSpan={7}>
          <span onClick={handleClick} className={calculateClass('May')} id={`${visibleYear}-05`}>May</span>
          <span onClick={handleClick} className={calculateClass('Jun')} id={`${visibleYear}-06`}>Jun</span>
          <span onClick={handleClick} className={calculateClass('Jul')} id={`${visibleYear}-07`}>Jul</span>
          <span onClick={handleClick} className={calculateClass('Aug')} id={`${visibleYear}-08`}>Aug</span>
        </td>
      </tr>
      <tr>
      <td colSpan={7}>
          <span onClick={handleClick} className={calculateClass('Sep')} id={`${visibleYear}-09`}>Sep</span>
          <span onClick={handleClick} className={calculateClass('Oct')} id={`${visibleYear}-10`}>Oct</span>
          <span onClick={handleClick} className={calculateClass('Nov')} id={`${visibleYear}-11`}>Nov</span>
          <span onClick={handleClick} className={calculateClass('Dec')} id={`${visibleYear}-12`}>Dec</span>
        </td>
      </tr>
    </tbody>
  )
}

export const Years = props => {
  let {visibleDate, selectedDate, handleClick, ...otherProps} = props
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
    return(<span key={index} onClick={handleClick} className={spanHtmlClass} id={yr}>{yr}</span>)
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

export const DatePicker = props => {
  let {
    className, visibleDate, selectedDate, previous, next,
    changeView, currentView, showDaysLabel,
    selectMonth, selectYear, selectDay, ...otherProps
  } = props
  return(
    <table className={className}>
      <Header
        visibleDate={visibleDate}
        onPrevious={previous}
        onNext={next}
        onChangeView={changeView}
        currentView={currentView}
        showDaysLabel={showDaysLabel}
      />
      {{
        'months':(
          <Months visibleDate={visibleDate} selectedDate={selectedDate} handleClick={selectMonth}/>
        ),
        'years':(
          <Years visibleDate={visibleDate} selectedDate={selectedDate} handleClick={selectYear}/>
        ),
        'dates':(
          <Days visibleDate={visibleDate} selectedDate={selectedDate} handleClick={selectDay}/>
        )
      }[currentView || 'dates']}
    </table>
  )
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    let selectedDate = (props.selectedDate ? moment(props.selectedDate) : moment()).startOf('day');
    let currentView = props.currentView ? props.currentView : 'dates'
    let showDaysLabel = (currentView === 'dates')
    this.state = {
      selectedDate: selectedDate,
      visibleDate: selectedDate,
      currentView: currentView,
      showDaysLabel: showDaysLabel,
      textInputVisible: props.textInputVisible ? props.textInputVisible : false,
      inputFormat: props.inputFormat ? props.inputFormat : 'YYYY-MM-DD',
      validSelection: selectedDate.isValid(),
      inputText: ''
    };
  }

  selectDay = (e) => {
    let date = moment(e.target.id, 'YYYY-MM-DD')
    this.setState({
      visibleDate: date,
      selectedDate: date,
      validSelection: date.isValid(),
      currentView: 'dates',
      inputText: date.format(this.state.inputFormat)
    })
  }

  selectMonth = (e) => {
    this.setState({
      visibleDate: moment(e.target.id, 'YYYY-MM'),
      currentView: 'dates'
    })
  }

  selectYear = (e) => {
    this.setState({
      visibleDate: moment(e.target.id, 'YYYY'),
      currentView: 'months'
    })
  }

  previous = () => {
    switch(this.state.currentView){
      case 'months':
        let previousYearDate = this.state.visibleDate.clone().startOf('year').subtract(1,'year')
        this.setState({
          visibleDate: previousYearDate,
        })
        break;
      case 'years':
        let activeYear = this.state.visibleDate.year()
        let startOfDecade = activeYear - (activeYear % 10)
        let previousDecadeDate = moment(startOfDecade - 10, 'YYYY')
        this.setState({
          visibleDate: previousDecadeDate,
        })
        break;
      default:
        let previousMonthDate = this.state.visibleDate.clone().startOf('month').subtract(1,'months')
        this.setState({
          visibleDate: previousMonthDate,
        })
    }
  }

  next = () => {
    switch(this.state.currentView){
      case 'months':
        let nextYearDate = this.state.visibleDate.clone().startOf('year').add(1,'year')
        this.setState({
          visibleDate: nextYearDate,
        })
        break;
      case 'years':
        let activeYear = this.state.visibleDate.year()
        let startOfDecade = activeYear - (activeYear % 10)
        let nextDecadeDate = moment(startOfDecade + 10, 'YYYY')
        this.setState({
          visibleDate: nextDecadeDate,
        })
        break;
      default:
        let nextMonthDate = this.state.visibleDate.clone().startOf('month').add(1,'months')
        this.setState({
          visibleDate: nextMonthDate,
        })
    }
  }

  changeView = () => {
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
      currentView: viewToBeChanged,
      showDaysLabel: (viewToBeChanged === 'dates')
    })
  }

  handleInputTextChange = (e) => {
    let expectedFormat = this.state.inputFormat
    let isDateValid = false
    let input = e.target.value
    let calculateDate = () => {
      if(input === ''){
        return this.state.selectedDate.startOf('day')
      }else{
        let date = moment(input, expectedFormat).startOf('day')
        if(date.isValid()){
          isDateValid = true
          return date
        }else{
          return this.state.selectedDate.startOf('day')
        }
      }
    }
    let date = calculateDate()
    this.setState({
      selectedDate: date,
      visibleDate: date,
      validSelection: isDateValid,
      inputText: input
    })
  }

  render() {
    let datepicker = (className) => {
      return(
        <DatePicker
          className={className}
          visibleDate={this.state.visibleDate}
          selectedDate={this.state.selectedDate}
          currentView={this.state.currentView}
          previous={this.previous}
          next={this.next}
          changeView={this.changeView}
          showDaysLabel={this.state.showDaysLabel}
          selectDay={this.selectDay}
          selectMonth={this.selectMonth}
          selectYear={this.selectYear}
        />
      )
    }

    let datepickerType = () => {
      if(this.state.textInputVisible){
        return(
          <div>
            <input className={`date-input ${(this.state.validSelection ? '' : 'error')}` } placeholder={this.state.inputFormat} onChange={this.handleInputTextChange} type='text' value={this.state.inputText}></input>
            {datepicker('date-picker modal')}
          </div>
        )
      }else{
        return(
          <div>
            {datepicker('date-picker')}
          </div>
        )
      }
    }

    return(
      <div>
        <label>{this.props.name}</label>
        { datepickerType() }
      </div>
    );
  }
}
