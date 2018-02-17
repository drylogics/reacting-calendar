import React, { Component } from 'react'
import moment from 'moment';


export class Days extends Component {

  render() {
    const FirstRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i,'days').format('D')}</td> )
      }
      </tr>
    );
    const SecondRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i+7,'days').format('D')}</td> )
      }
      </tr>
    );
    const ThirdRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i+14,'days').format('D')}</td> )
      }
      </tr>
    );
    const FourthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i+21,'days').format('D')}</td> )
      }
      </tr>
    );
    const FifthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i+28,'days').format('D')}</td> )
      }
      </tr>
    );
    const SixthRow = () => (
      <tr>
      {
        [...Array(7).keys()].map((i) =>  <td>{(this.props.currentState.firstSunday.clone()).add(i+35,'days').format('D')}</td> )
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
