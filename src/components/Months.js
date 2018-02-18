import React, { Component } from 'react'

export class Months extends Component {

  render() {
    return(
      <tbody>
      {
        [...Array(3).keys()].map((j) =>
          <tr>
          {
            [...Array(4).keys()].map((i) => <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i+(j*4),'months').format('MMM')}</td> )
          }
          </tr>)
      }
      </tbody>
    );
  }
}

export default Months;
