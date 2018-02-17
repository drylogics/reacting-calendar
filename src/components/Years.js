import React, { Component } from 'react'
import moment from 'moment';

export class Years extends Component {

  render() {
    const FirstRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i - 9,'years').format('YYYY')}</td> )
      }
      </tr>
    );
    const SecondRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i - 5,'years').format('YYYY')}</td> )
      }
      </tr>
    );
    const ThirdRow = () => (
      <tr>
      {
        [...Array(4).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i - 1,'years').format('YYYY')}</td> )
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

export default Years;
