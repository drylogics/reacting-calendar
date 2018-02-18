import React, { Component } from 'react'

export class Years extends Component {

  render() {
    return(
      <tbody>
      {
        [...Array(3).keys()].map((j) =>
          <tr>
          {
            [...Array(4).keys()].map((i) => <td>{(this.props.currentState.firstSunday.startOf('year').clone()).add(i + ((j*4) - 9),'years').format('YYYY')}</td> )
          }
          </tr>)
      }
      </tbody>
    );
  }
}

export default Years;
