import React, { Component } from "react";
import _ from "lodash";

export const Footer = props => {
  const { data, type, headerCount } = props;

  return (
    <tfoot>
      {
        {
          empty: (
            <tr className="footer-row empty">
              <td colSpan={headerCount}>No Data available.</td>
            </tr>
          ),
          "": null
        }[type || ""]
      }
    </tfoot>
  );
};

export const Row = props => {
  const { data } = props;

  return (
    <tr className='row'>
      {_.map(data, (value, index) => {
        return <td key={index}>{value}</td>;
      })}
    </tr>
  );
};

export const Body = props => {
  const { data } = props;

  return (
    <tbody>
      {_.isEmpty(data)
        ? null
        : _.map(data, (rowValues, index) => {
            return <Row key={index} data={rowValues} />;
          })}
    </tbody>
  );
};

export const Header = props => {
  const { headers } = props;
  return (
    <thead>
      <tr className="header-row">
        {_.map(headers, (header, index) => {
          return <th key={index}>{header}</th>;
        })}
      </tr>
    </thead>
  );
};

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: props.data.headers,
      values: props.data.values
    };
  }

  footerType = () => {
    return _.isEmpty(this.state.values) ? "empty" : "";
  };

  getHeaderValues = () => {
    return _.values(this.state.headers);
  };

  render() {
    return (
      <div className="data-table">
        <table>
          <Header headers={this.getHeaderValues()} />
          <Body data={this.state.values} />
          <Footer
            type={this.footerType()}
            headerCount={_.size(this.state.headers)}
            data={this.state.values}
          />
        </table>
      </div>
    );
  }
}

export default DataTable;
