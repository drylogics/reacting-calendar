import React, { Component } from "react";
import PropTypes from 'prop-types';
import _ from 'lodash';


export class Filter extends Component{
  constructor(props){
    super(props);
    this.state ={
      type: props.type,
      title: props.title
    }
  }

  render() {
    return(
      <div className="filter">
        {this.state.title}
      </div>
    )
  }
}


Filter.defaultProps = {
  type: 'string'
};

Filter.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default class FilterTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: props.columns
    };
  }

  render() {
    return(
      <div className="filter-tile">
        {
          _.map(this.state.columns, (column, index) =>{
           return <Filter key ={index} title={column.key}/>
          })
        }
      </div>
    );
  }
}

FilterTile.defaultProps = {
  columns: [{key: 'column1'}]
};

FilterTile.propTypes = {
  columns: PropTypes.array.isRequired
};
