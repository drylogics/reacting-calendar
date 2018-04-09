import React from "react";
import _ from "lodash";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEdittable: false
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.handleContentChange(e)
  }

  handleKeyDown(evt){
    switch (evt.keyCode) {
      case 13: // Enter
      case 9: // Tab
        this.handleFocusOut();
        break;
    }
    return null;
  }

  handleFocusOut(evt){
    this.setState({ isEdittable: false });
  }

  handleEditCell(evt){
    this.setState({ isEdittable: true });
  }

  render() {
    return (
      <td>
        {this.state.isEdittable ? (
          <input
            type="text"
            value={this.state.value}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.handleChange.bind(this)}
            onBlur={this.handleFocusOut.bind(this)}
            autoFocus={true}
          />
        ) : (
          <div onClick={this.handleEditCell.bind(this)}>{this.state.value}</div>
        )}
      </td>
    );
  }
}

const Row = props => {
  const { values, handleContentChange } = props;

  return (
    <tr>
      {_.map(values, (value, index) => (
        <Cell
          key={index}
          value={value}
          handleContentChange={handleContentChange}
        />
      ))}
    </tr>
  );
};

const HeaderRow = props => (
  <thead>
    <tr>
      <th className="action">Action</th>
      <th className="brand-id">Brand ID</th>
      <th className="season-num">Season Number</th>
      <th className="name">Name</th>
      <th className="relative-number">Relative Number</th>
      <th className="absolute-number">Absolute Number</th>
      <th className="aired">Aired</th>
    </tr>
  </thead>
);

export default class TableEdittable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || []
    };
  }

  handleContentChange(e) {
    const value = e.target.value;
    console.log(value);
  }

  render() {
    const rowValues = _.map(this.state.data, obj => _.values(obj));
    const isTableEmpty = _.isEmpty(rowValues);

    return (
      <div>
        <table>
          <HeaderRow />
          <tbody>
            {isTableEmpty
              ? null
              : _.map(rowValues, (values, index) => {
                  return (
                    <Row
                      key={index}
                      values={values}
                      handleContentChange={this.handleContentChange}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}
