import React, { Component } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import _ from "lodash";
import injectSheet from "react-jss";

const styles = {
  mainClass: {
    "font-family": "Arial, Helvetica, sans-serif",
    "font-weight": 400,
    "border-color": "grey",
    "text-align": "center",
    color: "black",
    "text-transform": "uppercase",
    "box-sizing": "border-box",
    direction: "ltr"
  },
  table: {
    "font-family": "Arial, Helvetica, sans-serif",
    "font-weight": "400",
    "border-color": "grey",
    "text-align": "center",
    color: "black",
    "text-transform": "uppercase",
    "box-sizing": "border-box",
    direction: "ltr"
  },
  thead: {
    "vertical-align": "middle"
  },
  columnHeader: {
    cursor: "pointer",
    padding: "0 5",
    width: "30px",
    height: "30px",
    "font-size": "12px",
    "font-weight": "bold"
  },
  switch: {
    width: "145px"
  },
  tbody: {
    "vertical-align": "middle"
  },
  cell: {
    padding: "0 5",
    width: "30px",
    height: "30px",
    "border-radius": "4px",
    border: "none",
    "font-size": "12px",
    cursor: "pointer"
  },
  old: {
    color: "#999"
  },
  new: {
    color: "#999"
  },
  active: {
    color: "#fff",
    "background-color": "#0d90c0",
    "border-color": "#0d90c0"
  },
  month: {
    width: "23%",
    height: "54px",
    "line-height": "54px",
    float: "left",
    margin: "1%",
    cursor: "pointer",
    "border-radius": "4px"
  },
  activeMonth: {
    color: "#fff",
    "background-color": "#3276b1",
    "border-color": "#285e8e"
  },
  year: {
    width: "23%",
    height: "54px",
    "line-height": "54px",
    float: "left",
    margin: "1%",
    cursor: "pointer",
    "border-radius": "4px"
  },
  activeYear: {
    color: "#fff",
    "background-color": "#3276b1",
    "border-color": "#285e8e"
  },
  dateInput: {
    position: "relative",
    color: "#aaa",
    "font-size": "16px"
  },
  input: {
    width: "230px",
    height: "32px",
    background: "#fcfcfc",
    border: "1px solid #aaa",
    "border-radius": "5px",
    "box-shadow": "0 0 3px #ccc, 0 10px 15px #ebebeb inset",
    "text-indent": "10px"
  },
  dateInputButton: {
    position: "absolute",
    float: "right",
    top: "10px",
    left: "205px",
    border: "0px",
    "background-color": "inherit"
  },
  errorInput: {
    border: "3px solid #a94442"
  },
  visible: {
    display: "block"
  },
  hidden: {
    display: "none"
  },
  modal: {
    border: "1px solid black",
    "border-radius": "5px",
    padding: "1px",
    width: "fit-content",
    "text-align": "center",
    background: "#fff",
    position: "relative",
    "z-index": "1000"
  }
};

const moment = extendMoment(Moment);

const header = props => {
  const {
    classes,
    visibleDate,
    onPrevious,
    onNext,
    onChangeView,
    currentView,
    showDaysLabel
  } = props;
  const headerText = () => {
    if (currentView == "dates") {
      return visibleDate.format("MMMM YYYY");
    } else if (currentView == "months") {
      return visibleDate.format("YYYY");
    } else {
      let year = visibleDate.year();
      let startOfDecade = year - year % 10;
      return `${startOfDecade} - ${startOfDecade + 9}`;
    }
  };

  const dayLabels = (
    <tr>
      {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map((day, index) => {
        return (
          <th key={index} colSpan="1" className="dow">
            {day}
          </th>
        );
      })}
    </tr>
  );

  return (
    <thead className={classes.thead}>
      <tr>
        <th
          onClick={onPrevious}
          colSpan={1}
          className={`prev ${classes.columnHeader}`}
        >
          «
        </th>
        <th
          colSpan="5"
          onClick={onChangeView}
          className={`${classes.switch} ${classes.columnHeader}`}
        >
          {headerText()}
        </th>
        <th
          onClick={onNext}
          colSpan="1"
          className={"next " + classes.columnHeader}
        >
          »
        </th>
      </tr>
      {showDaysLabel ? dayLabels : null}
    </thead>
  );
};

const days = props => {
  const { classes, visibleDate, selectedDate, handleClick } = props;
  const startOfMonth = visibleDate.clone().startOf("month");
  const startDate =
    startOfMonth.day() === 0
      ? startOfMonth.clone().weekday(-7)
      : startOfMonth.clone().startOf("week");
  const endDate = startDate.clone().add(41, "days");
  const range = moment.range(startDate, endDate);
  let tdHtmlClass = "";
  let dateString = "";
  let dates = Array.from(range.by("day")).map(dt => {
    if (dt.isBefore(visibleDate, "month")) {
      tdHtmlClass = "day " + classes.old;
    } else if (dt.isAfter(visibleDate, "month")) {
      tdHtmlClass = "day " + classes.new;
    } else if (dt.isSame(selectedDate, "day")) {
      tdHtmlClass = "day " + classes.active;
    } else {
      tdHtmlClass = "day";
    }
    dateString = dt.format("YYYY-MM-DD");
    return (
      <td
        key={dateString}
        onClick={handleClick}
        className={classes.cell + " " + tdHtmlClass}
        id={dateString}
      >
        {dt.format("DD")}
      </td>
    );
  });

  return (
    <tbody className={classes.tbody}>
      {_.chain(dates)
        .chunk(7)
        .map((arr, index) => <tr key={index}>{arr}</tr>)
        .value()}
    </tbody>
  );
};

export const months = props => {
  const { classes, visibleDate, selectedDate, handleClick } = props;
  const visibleYear = visibleDate.year();
  const selectedYear = selectedDate.year();
  const calculateClass = monthName =>
    `${monthName} ${visibleYear}` === selectedDate.format("MMM YYYY")
      ? classes.month + " " + classes.activeMonth
      : classes.month;

  return (
    <tbody className={classes.tbody}>
      <tr>
        <td colSpan={7} className={classes.cell}>
          <span
            onClick={handleClick}
            className={calculateClass("Jan")}
            id={`${visibleYear}-01`}
          >
            Jan
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Feb")}
            id={`${visibleYear}-02`}
          >
            Feb
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Mar")}
            id={`${visibleYear}-03`}
          >
            Mar
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Apr")}
            id={`${visibleYear}-04`}
          >
            Apr
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={7} className={classes.cell}>
          <span
            onClick={handleClick}
            className={calculateClass("May")}
            id={`${visibleYear}-05`}
          >
            May
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Jun")}
            id={`${visibleYear}-06`}
          >
            Jun
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Jul")}
            id={`${visibleYear}-07`}
          >
            Jul
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Aug")}
            id={`${visibleYear}-08`}
          >
            Aug
          </span>
        </td>
      </tr>
      <tr>
        <td colSpan={7} className={classes.cell}>
          <span
            onClick={handleClick}
            className={calculateClass("Sep")}
            id={`${visibleYear}-09`}
          >
            Sep
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Oct")}
            id={`${visibleYear}-10`}
          >
            Oct
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Nov")}
            id={`${visibleYear}-11`}
          >
            Nov
          </span>
          <span
            onClick={handleClick}
            className={calculateClass("Dec")}
            id={`${visibleYear}-12`}
          >
            Dec
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export const years = props => {
  const {
    classes,
    visibleDate,
    selectedDate,
    handleClick,
    ...otherProps
  } = props;
  const selectedYear = selectedDate.year();
  const activeYear = visibleDate.year();
  const startOfDecade = activeYear - activeYear % 10;
  let spanHtmlClass = "year ";
  let years = _.range(startOfDecade - 1, startOfDecade + 11).map(
    (yr, index) => {
      if (yr < startOfDecade) {
        spanHtmlClass = spanHtmlClass + classes.old;
      } else if (yr < startOfDecade + 10) {
        spanHtmlClass =
          spanHtmlClass + (selectedYear === yr ? classes.activeYear : "");
      } else {
        spanHtmlClass = spanHtmlClass + classes.new;
      }
      return (
        <span
          key={index}
          onClick={handleClick}
          className={spanHtmlClass}
          id={yr}
        >
          {yr}
        </span>
      );
    }
  );
  return (
    <tbody className={classes.tbody}>
      {_.chain(years)
        .chunk(4)
        .map((arr, index) => (
          <tr key={index}>
            <td className={classes.cell} colSpan={7} key={index}>
              {arr}
            </td>
          </tr>
        ))
        .value()}
    </tbody>
  );
};

export const Header = injectSheet(styles)(header);
export const Days = injectSheet(styles)(days);
export const Months = injectSheet(styles)(months);
export const Years = injectSheet(styles)(years);

export const datePickerComponent = props => {
  let {
    classes,
    className,
    visibleDate,
    selectedDate,
    previous,
    next,
    changeView,
    currentView,
    showDaysLabel,
    selectMonth,
    selectYear,
    selectDay
  } = props;
  return (
    <table className={className + `${classes.table}`}>
      <Header
        visibleDate={visibleDate}
        onPrevious={previous}
        onNext={next}
        onChangeView={changeView}
        currentView={currentView}
        showDaysLabel={showDaysLabel}
      />
      {
        {
          months: (
            <Months
              visibleDate={visibleDate}
              selectedDate={selectedDate}
              handleClick={selectMonth}
            />
          ),
          years: (
            <Years
              visibleDate={visibleDate}
              selectedDate={selectedDate}
              handleClick={selectYear}
            />
          ),
          dates: (
            <Days
              visibleDate={visibleDate}
              selectedDate={selectedDate}
              handleClick={selectDay}
            />
          )
        }[currentView || "dates"]
      }
    </table>
  );
};

export const DatePicker = injectSheet(styles)(datePickerComponent);

class Calendar extends Component {
  constructor(props) {
    super(props);
    const selectedDate = (props.selectedDate
      ? moment(props.selectedDate)
      : moment()
    ).startOf("day");
    const currentView = props.currentView ? props.currentView : "dates";
    const showDaysLabel = currentView === "dates";
    const textInputVisible = props.textInputVisible
      ? props.textInputVisible
      : false;
    const isDatepickerVisible = textInputVisible ? false : true;
    this.classes = props.classes;

    this.state = {
      selectedDate: selectedDate,
      visibleDate: selectedDate,
      currentView: currentView,
      showDaysLabel: showDaysLabel,
      textInputVisible: textInputVisible,
      inputFormat: props.inputFormat ? props.inputFormat : "YYYY-MM-DD",
      validSelection: selectedDate.isValid(),
      inputText: "",
      isDatepickerVisible: isDatepickerVisible
    };
  }

  selectDay = e => {
    const date = moment(e.target.id, "YYYY-MM-DD");
    this.setState({
      visibleDate: date,
      selectedDate: date,
      validSelection: date.isValid(),
      currentView: "dates",
      inputText: date.format(this.state.inputFormat),
      isDatepickerVisible: false
    });
  };

  selectMonth = e => {
    this.setState({
      visibleDate: moment(e.target.id, "YYYY-MM"),
      currentView: "dates",
      showDaysLabel: true
    });
  };

  selectYear = e => {
    this.setState({
      visibleDate: moment(e.target.id, "YYYY"),
      currentView: "months"
    });
  };

  previous = () => {
    let dateToSet = null;
    switch (this.state.currentView) {
      case "months":
        dateToSet = this.state.visibleDate
          .clone()
          .startOf("year")
          .subtract(1, "year");
        break;
      case "years":
        const activeYear = this.state.visibleDate.year();
        const startOfDecade = activeYear - activeYear % 10;
        dateToSet = moment(startOfDecade - 10, "YYYY");
        break;
      default:
        dateToSet = this.state.visibleDate
          .clone()
          .startOf("month")
          .subtract(1, "months");
    }
    this.setState({
      visibleDate: dateToSet
    });
  };

  next = () => {
    let dateToSet = null;
    switch (this.state.currentView) {
      case "months":
        dateToSet = this.state.visibleDate
          .clone()
          .startOf("year")
          .add(1, "year");
        break;
      case "years":
        const activeYear = this.state.visibleDate.year();
        const startOfDecade = activeYear - activeYear % 10;
        dateToSet = moment(startOfDecade + 10, "YYYY");
        break;
      default:
        dateToSet = this.state.visibleDate
          .clone()
          .startOf("month")
          .add(1, "months");
    }
    this.setState({
      visibleDate: dateToSet
    });
  };

  changeView = () => {
    let viewToBeChanged = "";
    switch (this.state.currentView) {
      case "dates":
        viewToBeChanged = "months";
        break;
      case "months":
        viewToBeChanged = "years";
        break;
      default:
        viewToBeChanged = "years";
    }
    this.setState({
      currentView: viewToBeChanged,
      showDaysLabel: viewToBeChanged === "dates"
    });
  };

  handleInputTextChange = e => {
    const expectedFormat = this.state.inputFormat;
    let isDateValid = false;
    const input = e.target.value;
    const calculateDate = () => {
      if (input === "") {
        return this.state.selectedDate.clone().startOf("day");
      } else {
        const dt = moment(input, expectedFormat).startOf("day");
        if (dt.isValid()) {
          isDateValid = true;
          return dt;
        } else {
          return this.state.selectedDate.clone().startOf("day");
        }
      }
    };
    const date = calculateDate();
    this.setState({
      selectedDate: date,
      visibleDate: date,
      validSelection: isDateValid,
      inputText: input
    });
  };

  toggleCalendar = () => {
    this.setState({
      isDatepickerVisible: !this.state.isDatepickerVisible
    });
  };

  render() {
    const classes = this.classes;
    const datepicker = className => {
      return (
        <DatePicker
          className={classes.mainClass}
          visibleDate={this.state.visibleDate}
          selectedDate={this.state.selectedDate}
          currentView={this.state.currentView}
          previous={this.previous}
          next={this.next}
          changeView={this.changeView}
          showDaysLabel={this.state.showDaysLabel}
          selectDay={this.selectDay}
          selectMonth={this.selectMonth}
          selectYear={this.selectYear}
        />
      );
    };

    const datepickerType = () => {
      if (this.state.textInputVisible) {
        return (
          <div>
            <div className={classes.dateInput}>
              <input
                className={`${classes.input} ${
                  this.state.validSelection ? "" : classes.errorInput
                }`}
                placeholder={this.state.inputFormat}
                onChange={this.handleInputTextChange}
                type="text"
                value={this.state.inputText}
              />
              <button
                className={classes.dateInputButton}
                onClick={this.toggleCalendar}
                type="button"
              >
                ⯆
              </button>
            </div>
            {datepicker(
              `date-picker ${classes.modal} ${
                this.state.isDatepickerVisible
                  ? classes.visible
                  : classes.hidden
              }`
            )}
          </div>
        );
      } else {
        return <div>{datepicker(`date-picker ${classes.visible}`)}</div>;
      }
    };

    return (
      <div>
        <label>{this.props.name}</label>
        {datepickerType()}
      </div>
    );
  }
}
export default injectSheet(styles)(Calendar);
