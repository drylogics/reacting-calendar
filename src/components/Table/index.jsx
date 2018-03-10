import React from 'react';
import _ from 'lodash';


class Cell extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.children || ""
      };
    }

    render() {
      return (
        <div className={"td" + this.state.isHeader ? "head" : "value"}>
          {this.state.value}
        </div>
      );
    }
  }

  class Row extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: props.columns || [],
        values: props.values || [],
        isHeaderRow: props.isHeaderRow || false
      };
    }

    getValues() {
      const values = this.state.values
      return _.chain(this.state.columns).map(column => {
        if(column.visible === true){
          return (
          <Cell
            width={column.width}
            isHeader={this.state.isHeaderRow}
            value={this.state.isHeaderRow ? column.name : values.key}
          />
          )
        }
      }).omitBy(_.isNil).values() 
    }

    render() {
      return (
        <div
          className={"tr" + this.state.isHeader ? "head" : "value"}
          style={{ display: "flex" }}
        >
          {this.getValues()}
        </div>
      );
    }
  }

  class Body extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: props.columns || [],
        values: props.values || []
      };
    }

    getKeys() {
      return _.chain(this.state.columns)
        .filter(column => column.visible !== false)
        .map("key")
        .value();
    }

    getContent() {
      const keys = this.getKeys();
    }

    render() {
      return <div className="tbody" />;
    }
  }

  class Header extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        columns: props.columns
      };
    }

    getHeaders() {
      const columns = this.state.columns;
      const headers = _.chain(columns)
        .filter(column => column.visible !== false)
        .map("name")
        .value();
      return <Row columns={this.state.columns} values={headers} isHeaderRow />;
    }

    render() {
      return <div className="thead">{this.getHeaders()}</div>;
    }
  }

export default  class Table extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: props.title || "Data Table",
        columns: props.columns || [],
        values: props.values || []
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.columns !== nextProps.columns) {
        this.setState({
          columns: nextProps.columns,
          values: nextProps.values
        });
      }
    }

    render() {
      return (
        <div className={"data-table " + this.state.title}>
          <h2>{this.state.title}</h2>
          <Header columns={this.state.columns} />
          <Body columns={this.state.columns} values={this.state.values} />
        </div>
      );
    }
  }