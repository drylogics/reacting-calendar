import React from "react";
import _ from "lodash";
import $ from "jquery";
import moment from "moment";

class Collection extends React.Component {
  render() {
    const {
      name,
      tempId,
      option,
      className,
      onChange,
      optionList,
      defaultOption
    } = this.props;

    const optionDivs = _.map(optionList, (option, index) => {
      return <option key={index}>{option}</option>;
    });

    return (
      <div>
        <select
          defaultValue={defaultOption}
          name={name}
          id={tempId}
          value={option}
          className={className}
          ref={el => (this.el = el)}
          onChange={onChange}
          style={{
            border: 0,
            backgroundColor: "#FFF",
            WebkitAppearance: "none",
            MozAppearance: "none",
            width: "40px"
          }}
        >
          {optionDivs}
        </select>
      </div>
    );
  }
}

class DatePicker extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    // const datepicker = this.$el.datepicker({
    //   format: "yyyy/mm/dd",
    //   autoclose: true,
    //   defaultDate: false,
    //   keyboardNavigation: false
    // });
    this.handleChange = this.handleChange.bind(this);
    // datepicker.on("changeDate", this.handleChange);
  }

  // componentWillUnmount() {
  //   this.$el.off("changeDate", this.handleChange);
  //   this.$el.datepicker("destroy");
  // }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          readOnly={true}
          name={this.props.name}
          id={this.props.tempId}
          disabled={this.props.disabled}
          value={moment(this.props.date).format("YYYY/MM/DD")}
          className={this.props.className}
          ref={el => (this.el = el)}
        />
      </div>
    );
  }
}

class Cell extends React.Component {
  render() {
    const { cellData, onTableUpdate } = this.props;
    const { tempId, datakey, value, dataType, collection } = cellData;
    return (
      <td
        className={datakey}
        style={{ border: "1px solid black", borderRadius: "0px" }}
      >
        {
          {
            date: (
              <DatePicker
                className="aired-date"
                name={datakey}
                tempId={tempId}
                disabled={false}
                onChange={onTableUpdate}
                date={moment(value, "YYYY/MM/DD")}
              />
            ),
            collection: (
              <Collection
                className="override-type"
                name={datakey}
                tempId={tempId}
                disabled={false}
                onChange={onTableUpdate}
                optionList={collection}
                defaultOption={value}
              />
            ),
            default: (
              <input
                type="text"
                name={datakey}
                id={tempId}
                value={value}
                onChange={onTableUpdate}
                style={{ border: "0" }}
              />
            )
          }[dataType || "default"]
        }
      </td>
    );
  }
}

class Row extends React.Component {
  onDeleteRow() {
    this.props.onDeleteRow(this.props.data);
  }
  render() {
    const { onTableUpdate, data, columns } = this.props;
    const cells = _.map(columns, (column, index) => {
      return (
        <Cell
          key={index}
          onTableUpdate={onTableUpdate}
          cellData={{
            datakey: column.key,
            value: data[column.key],
            tempId: data.tempId,
            dataType: column.type || "default",
            collection: column.collection || []
          }}
        />
      );
    });

    return (
      <tr className="override">
        {cells}
        <td className="del-cell">
          <input
            type="button"
            onClick={this.onDeleteRow.bind(this)}
            value="Delete"
            className="delete-row"
          />
        </td>
      </tr>
    );
  }
}

class Table extends React.Component {
  render() {
    const { onTableUpdate, onRowDel, columns, overrides } = this.props;
    const rows = _.map(overrides, data => {
      return (
        <Row
          onTableUpdate={onTableUpdate}
          columns={columns}
          data={data}
          onDeleteRow={onRowDel.bind(this)}
          key={data.tempId}
        />
      );
    });

    const columnHeaders = _.map(columns, (column, index) => {
      return (
        <th key={index} className={column.key}>
          {column.name}
        </th>
      );
    });

    return (
      <div>
        <table className="override-table">
          <thead>
            <tr>
              {columnHeaders}
              <th className="row-actions" />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class Filter extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search Table"
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

class Pagination extends React.Component {
  getPages() {
    const { currentPage, pageCount, handlePageChange } = this.props;
    const min = Math.min(
      Math.max(1, pageCount - 4),
      Math.max(1, currentPage - 2)
    ); // Math.min(Math.max(1, pageCount + (startPage - range)), Math.max(startPage, currentPage - Math.floor(5/2)))
    const max = Math.min(min + 4, pageCount); // Math.min(min + range - 1, pageCount)
    return _.times(5, i => {
      const page = min + i;
      if (page <= max) {
        return page === currentPage ? (
          <input type="button" key={page} id={page} value={page} disabled />
        ) : (
          <input
            type="button"
            key={page}
            id={page}
            value={page}
            onClick={handlePageChange}
          />
        );
      }
      return null;
    });
  }

  render() {
    const { currentPage, pageCount, handlePageChange } = this.props;

    return (
      <div className="pagination">
        <input
          type="button"
          key="previous"
          id="previous"
          value="Previous"
          disabled={currentPage === 1}
          onClick={handlePageChange}
        />
        {this.getPages()}
        <input
          type="button"
          key="next"
          id="next"
          value="Next"
          disabled={currentPage === pageCount}
          onClick={handlePageChange}
        />
      </div>
    );
  }
}

class OverrideSection extends React.Component {
  constructor(props) {
    super(props);
    const overrides = this.props.data;
    const overridesWithId = _.map(overrides, data => ({
      ...data,
      tempId: Math.random().toString()
    }));
    this.rowsPerPage = 5;
    this.state = {
      columns: this.props.columns,
      filterText: "",
      overrides: overridesWithId,
      currentPage: 1,
      pageCount: Math.ceil(overridesWithId.length / this.rowsPerPage)
    };
  }

  getFilteredOverrides(filterText) {
    return _.filter(this.state.overrides, data => {
      const values = _.values(data);
      const matchNotFound = _.every(
        values,
        val => val.toLowerCase().indexOf(filterText.toLowerCase()) === -1
      );
      return !matchNotFound;
    });
  }

  handleFilterInput(filterText) {
    this.setState({
      filterText: filterText,
      currentPage: 1,
      pageCount: Math.ceil(
        this.getFilteredOverrides(filterText).length / this.rowsPerPage
      )
    });
  }

  getVisibleOverrides() {
    const { currentPage, filterText } = this.state;
    const rowsPerPage = this.rowsPerPage;
    let fromIndex = (currentPage - 1) * rowsPerPage;

    return _.chain(this.getFilteredOverrides(filterText))
      .slice(fromIndex, fromIndex + rowsPerPage)
      .value();
  }

  handleRowDel(data) {
    this.setState({ overrides: _.without(this.state.overrides, data) });
  }

  handleAddEvent(evt) {
    let newRowData = _.reduce(
      this.props.columns,
      (obj, column) => {
        obj[column.key] = "";
        return obj;
      },
      {}
    );
    newRowData.tempId = Math.random().toString();
    this.setState({ overrides: [newRowData, ...this.state.overrides] });
  }

  handleTable(evt) {
    const modifiedData = {
      tempId: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    _.map(this.state.overrides, data => {
      if (data.tempId === modifiedData.tempId) {
        data[modifiedData.name] = modifiedData.value;
      }
      return data;
    });
    this.setState({ overrides: this.state.overrides });
  }

  handlePageChange(e) {
    const id = e.target.id;
    let { currentPage } = this.state;
    let pageNumber;

    if (id === "next") {
      pageNumber = Number(currentPage + 1);
    } else if (id === "previous") {
      pageNumber = Number(currentPage - 1);
    } else {
      pageNumber = Number(id);
    }
    this.setState({
      currentPage: pageNumber
    });
  }

  render() {
    const { filterText, columns, pageCount, currentPage } = this.state;

    return (
      <div>
        <Filter
          filterText={filterText}
          onUserInput={this.handleFilterInput.bind(this)}
        />
        <button
          type="button"
          onClick={this.handleAddEvent.bind(this)}
          className="add-row"
        >
          Add
        </button>
        <Table
          onTableUpdate={this.handleTable.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          overrides={this.getVisibleOverrides()}
          columns={columns}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={this.handlePageChange.bind(this)}
        />
      </div>
    );
  }
}

export default class TvOverrideView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: {
        columns: [
          {
            key: "action",
            name: "Action",
            type: "collection",
            collection: ["DROP", "ADD"]
          },
          {
            key: "brandId",
            name: "Brand ID"
          },
          {
            key: "seasonNum",
            name: "Season Number"
          },
          {
            key: "name",
            name: "Name"
          },
          {
            key: "relativeNum",
            name: "Relative Number"
          },
          {
            key: "absoluteNum",
            name: "Absolute Number"
          },
          {
            key: "aired",
            name: "Aired",
            type: "date"
          }
        ],
        values: [
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-11-02"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-10-31"
          },
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-06"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-02"
          },
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-11-02"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-10-31"
          },
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-06"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-02"
          },
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-11-02"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Dig Me Up, Dig Me Down",
            relativeNum: "1",
            absoluteNum: "1",
            aired: "2016-10-31"
          },
          {
            action: "DROP",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-06"
          },
          {
            action: "ADD",
            brandId: "38390",
            seasonNum: "1",
            name: "Know, Know, Know Your Goat",
            relativeNum: "2",
            absoluteNum: "2",
            aired: "2016-11-02"
          }
        ]
      },
      seasons: {
        columns: [
          {
            key: "action",
            name: "Action",
            type: "collection",
            collection: ["DROP", "ADD"]
          },
          {
            key: "brandId",
            name: "Brand ID"
          },
          {
            key: "tvNetworkName",
            name: "TV Network Name"
          },
          {
            key: "name",
            name: "Name"
          },
          {
            key: "num",
            name: "Number"
          },
          {
            key: "startYear",
            name: "Start Year"
          },
          {
            key: "endYear",
            name: "End Year"
          },
          {
            key: "startDate",
            name: "Start Date",
            type: "date"
          },
          {
            key: "endDate",
            name: "End Date",
            type: "date"
          },
          {
            key: "networkType",
            name: "Network Type"
          },
          {
            key: "dayPart",
            name: "Day Part"
          }
        ],
        values: [
          {
            action: "DROP",
            brandId: "38390",
            tvNetworkName: "IFC",
            name: "Season 2",
            num: "2",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-10-31",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "33937",
            tvNetworkName: "BBC",
            name: "Dirk Gently's Holistic Detective Agency Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-22",
            endDate: "2016-12-10",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "29529",
            tvNetworkName: "TBS",
            name: "People of Earth Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-12-12",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "14290",
            tvNetworkName: "GSN",
            name: "The Chase Season 4",
            num: "4",
            startYear: "2015",
            endYear: "2015",
            startDate: "2015-01-27",
            endDate: "2015-12-11",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "DROP",
            brandId: "38390",
            tvNetworkName: "IFC",
            name: "Season 2",
            num: "2",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-10-31",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "33937",
            tvNetworkName: "BBC",
            name: "Dirk Gently's Holistic Detective Agency Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-22",
            endDate: "2016-12-10",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "29529",
            tvNetworkName: "TBS",
            name: "People of Earth Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-12-12",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "14290",
            tvNetworkName: "GSN",
            name: "The Chase Season 4",
            num: "4",
            startYear: "2015",
            endYear: "2015",
            startDate: "2015-01-27",
            endDate: "2015-12-11",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "DROP",
            brandId: "38390",
            tvNetworkName: "IFC",
            name: "Season 2",
            num: "2",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-10-31",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "33937",
            tvNetworkName: "BBC",
            name: "Dirk Gently's Holistic Detective Agency Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-22",
            endDate: "2016-12-10",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "29529",
            tvNetworkName: "TBS",
            name: "People of Earth Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-12-12",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "14290",
            tvNetworkName: "GSN",
            name: "The Chase Season 4",
            num: "4",
            startYear: "2015",
            endYear: "2015",
            startDate: "2015-01-27",
            endDate: "2015-12-11",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "DROP",
            brandId: "38390",
            tvNetworkName: "IFC",
            name: "Season 2",
            num: "2",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-10-31",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "33937",
            tvNetworkName: "BBC",
            name: "Dirk Gently's Holistic Detective Agency Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-22",
            endDate: "2016-12-10",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "29529",
            tvNetworkName: "TBS",
            name: "People of Earth Season 1",
            num: "1",
            startYear: "2016",
            endYear: "2016",
            startDate: "2016-10-31",
            endDate: "2016-12-12",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          },
          {
            action: "ADD",
            brandId: "14290",
            tvNetworkName: "GSN",
            name: "The Chase Season 4",
            num: "4",
            startYear: "2015",
            endYear: "2015",
            startDate: "2015-01-27",
            endDate: "2015-12-11",
            networkType: "network_cable",
            dayPart: "daypart_prime_time"
          }
        ]
      }
    };
  }

  fetchRecords() {
    fetch("http://localhost:3000/admin2/api/tv_season_overrides").then(res =>
      console.log(res)
    );
  }

  render() {
    const { episodes, seasons } = this.state;
    return (
      <div>
        <h1 onClick={this.fetchRecords.bind(this)}>Fetch</h1>
        <h2>Episodes</h2>
        <OverrideSection columns={episodes.columns} data={episodes.values} />
        <h2>Seasons</h2>
        <OverrideSection columns={seasons.columns} data={seasons.values} />
      </div>
    );
  }
}
