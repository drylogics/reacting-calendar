import React, { Component } from 'react'
import moment from 'moment';


export class Days extends Component {
  constructor(props) {
    super(props);
    let selectedDate = moment(props.selectedDate);
    let firstDayOfMonth = moment(props.dateValue).startOf('month');
    let firstDayValue = parseInt(firstDayOfMonth.format('d'));
    let firstSunday = firstDayOfMonth.subtract(firstDayValue,'days')
    this.state = {
      firstSunday: firstSunday,
    };
  }


  render() {
    const FirstRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i,'days').format('DD')}</td> )
      }
      </tr>
    );
    const SecondRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i+7,'days').format('DD')}</td> )
      }
      </tr>
    );
    const ThirdRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i+14,'days').format('DD')}</td> )
      }
      </tr>
    );
    const FourthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i+21,'days').format('DD')}</td> )
      }
      </tr>
    );
    const FifthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i+28,'days').format('DD')}</td> )
      }
      </tr>
    );
    const SixthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.state.firstSunday.clone()).add(i+35,'days').format('DD')}</td> )
      }
      </tr>
    );
    return(
      // <p>{this.state.firstSunday.format('DD')}</p>
      <tbody>
        <FirstRow />
        <SecondRow />
        <ThirdRow />
        <FourthRow />
        <FifthRow />
        <SixthRow />
      </tbody>
    );
  }
}

export default Days;
