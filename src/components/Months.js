import React, { Component } from 'react'
import moment from 'moment';


export class Months extends Component {

  render() {
    const FirstRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i,'months').format('MMM')}</td> )
      }
      </tr>
    );
    const SecondRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i+4,'months').format('MMM')}</td> )
      }
      </tr>
    );
    const ThirdRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i+8,'months').format('MMM')}</td> )
      }
      </tr>
    );
    return(
      // <p>{this.state.firstSunday.format('DD')}</p>
      <tbody>
        <FirstRow />
        <SecondRow />
        <ThirdRow />
      </tbody>
    );
  }
}

export default Months;
