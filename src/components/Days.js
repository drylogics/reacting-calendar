import React, { Component } from 'react'
import moment from 'moment';


export class Days extends Component {

  render() {
    return(
      <tbody>
      {
        [...Array(6).keys()].map((j) =>
          <tr>
          {
            [...Array(7).keys()].map((i) => <td>{(this.props.currentState.firstSunday.clone()).add(i + (j * 7),'days').format('D')}</td> )
          }
          </tr>)
      }
      </tbody>
    );
  }
}

export default Days;
