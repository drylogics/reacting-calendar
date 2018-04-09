define(
  ["jquery", "lodash", "react", "reactdom", "tsl", "lfm", "moment"],
  function($, _, React, ReactDOM, tsl, lfm, moment) {
    function CountTweetsView(props) {
      return (
        <form className="tca-form is-active">
          <fieldset className="tca-sidebar-fieldset">
            <legend> Count Tweets </legend>
            <SearchTermView
              searchTerm={props.searchTerm}
              onSearchTermChange={props.onSearchTermChange}
            />
            <FiltersView
              original={props.original}
              verified={props.verified}
              onOriginalContentClick={props.onOriginalContentClick}
              onVerifiedSourcesClick={props.onVerifiedSourcesClick}
            />
            <TimeRangeView
              reportLoaded={props.reportLoaded}
              within={props.within}
              fromDate={props.fromDate}
              fromTime={props.fromTime}
              toDate={props.toDate}
              toTime={props.toTime}
              timeZone={props.timeZone}
              onWithinTimeRangeChange={props.onWithinTimeRangeChange}
              onFromDateChange={props.onFromDateChange}
              onFromTimeChange={props.onFromTimeChange}
              onToDateChange={props.onToDateChange}
              onToTimeChange={props.onToTimeChange}
              onTimeZoneChange={props.onTimeZoneChange}
              onSearchTwitterClick={props.onSearchTwitterClick}
            />
            <SearchTwitter
              searchTerm={props.searchTerm}
              within={props.within}
              fromDate={props.fromDate}
              toDate={props.toDate}
              onSearchTwitterClick={props.onSearchTwitterClick}
            />
          </fieldset>
        </form>
      );
    }

    function SearchTermView(props) {
      return (
        <div>
          <h4 className="tca-form-header"> Search Term </h4>
          <input
            placeholder="Type To Add A Query"
            className="tca-search-twitter"
            value={props.searchTerm}
            onChange={props.onSearchTermChange}
          />
        </div>
      );
    }

    function SearchTwitter(props) {
      let canSearch =
        props.searchTerm != "" &&
        ((props.fromDate != "" && props.toDate != "") ||
          (props.within != "customDate" && props.within != "customDateTime"));
      return (
        <div className="tca-search-twitter">
          <button
            type="button"
            className="tca-button"
            onClick={props.onSearchTwitterClick}
            disabled={!canSearch}
          >
            Search Twitter
          </button>
        </div>
      );
    }

    function FiltersView(props) {
      return (
        <div>
          <h4 className="tca-form-header"> Filters </h4>
          <div>
            <input
              id="tca-original-content"
              type="checkbox"
              checked={props.original}
              onClick={props.onOriginalContentClick}
            />
            <label className="tca-label" htmlFor="tca-original-content">
              Only Original Content
            </label>
          </div>
          <div>
            <input
              id="tca-verified-sources"
              type="checkbox"
              checked={props.verified}
              onClick={props.onVerifiedSourcesClick}
            />
            <label className="tca-label" htmlFor="tca-verified-sources">
              Only From Verified Sources
            </label>
          </div>
        </div>
      );
    }

    function TimeRangeView(props) {
      return (
        <div>
          <h4 className="tca-form-header"> Time Range </h4>
          {props.within != null && (
            <PresetsView
              within={props.within}
              onWithinTimeRangeChange={props.onWithinTimeRangeChange}
            />
          )}
          {!_.includes(["1d", "7d", "28d"], props.within) && (
            <CustomTimeRangeInputs
              reportLoaded={props.reportLoaded}
              within={props.within}
              fromDate={props.fromDate}
              fromTime={props.fromTime}
              toDate={props.toDate}
              toTime={props.toTime}
              onFromDateChange={props.onFromDateChange}
              onFromTimeChange={props.onFromTimeChange}
              onToDateChange={props.onToDateChange}
              onToTimeChange={props.onToTimeChange}
              timeZone={props.timeZone}
            />
          )}
          <TimeZoneView
            reportLoaded={props.reportLoaded}
            timeZone={props.timeZone}
            onTimeZoneChange={props.onTimeZoneChange}
          />
        </div>
      );
    }

    function PresetsView(props) {
      return (
        <div>
          <label className="tca-label tca-time-range-label"> Within </label>
          <select
            value={props.within}
            onChange={props.onWithinTimeRangeChange}
            className="tca-time-range-select"
          >
            <option disabled="disabled" value="placeholder">
              Select Time Range Type
            </option>
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="28d">Last 28 days</option>
            <option value="customDate">Custom Date Range</option>
            <option value="customDateTime">Custom Dates and Time</option>
          </select>
        </div>
      );
    }

    function CustomTimeRangeInputs(props) {
      const {
        within,
        reportLoaded,
        fromDate,
        fromTime,
        toDate,
        toTime,
        onFromDateChange,
        onToDateChange,
        timeZone
      } = props;

      const dateFmt = "MM/DD/YYYY";
      const dateTimeFmt = `${dateFmt} hh:mm A`;
      let momentFrom = null;
      let momentTo = null;

      if (fromDate != "") {
        if (fromTime != "") {
          momentFrom = moment.tz(
            `${fromDate} ${fromTime}`,
            dateTimeFmt,
            timeZone
          );
        } else {
          momentFrom = moment.tz(fromDate, dateFmt, timeZone);
        }
      }
      if (toDate != "") {
        if (toTime != "") {
          momentTo = moment.tz(`${toDate} ${toTime}`, dateTimeFmt, timeZone);
        } else {
          momentTo = moment.tz(toDate, dateFmt, timeZone);
        }
        if (fromDate == toDate) {
          momentTo.add(30, "m");
        }
      }

      const absoluteMinDate = moment("2006-03-21", "YYYY-MM-DD").startOf("day");
      const absoluteMaxDate = moment().subtract("minutes", 5);
      absoluteMaxDate
        .minutes(absoluteMaxDate.minutes() > 30 ? 30 : 0)
        .tz(timeZone);
      const maxRange = moment.duration(31, "days");

      let fromDateStartDate = absoluteMinDate.clone();
      const minRangeDate =
        momentTo != null ? momentTo.clone().subtract(maxRange) : null;
      if (momentTo != null && minRangeDate.isAfter(absoluteMinDate)) {
        fromDateStartDate = minRangeDate;
      }
      const fromDateEndDate = momentTo != null ? momentTo : absoluteMaxDate;

      const toDateStartDate = momentFrom != null ? momentFrom : absoluteMinDate;
      let toDateEndDate = absoluteMaxDate.clone();
      const maxRangeDate =
        momentFrom != null ? momentFrom.clone().add(maxRange) : null;
      if (momentFrom != null && maxRangeDate.isBefore(absoluteMaxDate)) {
        toDateEndDate = maxRangeDate;
      }

      if (fromTime != "" && toTime != "" && momentFrom.isAfter(momentTo)) {
        momentFrom.startOf("day");
        momentTo = momentFrom.clone().add(30, "m");
      }
      const fromTimes = [];
      const toTimes = [];
      if (fromDate != "") {
        const maxFromTime =
          fromDate == toDate ? momentTo : momentFrom.clone().endOf("day");
        const time = momentFrom.clone().startOf("day");
        while (time.isBefore(absoluteMaxDate) && time.isBefore(maxFromTime)) {
          fromTimes.push(time.format("hh:mm A"));
          time.add(30, "m");
        }
      }
      if (toDate != "") {
        const time =
          fromDate == toDate
            ? momentFrom.clone().add("30", "m")
            : momentTo.clone().startOf("day");
        const maxToTime = momentTo.clone().endOf("day");
        while (time.isBefore(absoluteMaxDate) && time.isBefore(maxToTime)) {
          toTimes.push(time.format("hh:mm A"));
          time.add(30, "m");
        }
      }

      return (
        <div>
          <div>
            <label className="tca-time-range-label"> From </label>
            <DatePicker
              className="tca-time-rage-date-input"
              disabled={reportLoaded}
              onChange={onFromDateChange}
              date={fromDate}
              startDate={fromDateStartDate.format(dateFmt)}
              endDate={fromDateEndDate.format(dateFmt)}
            />
            {(within == "customDateTime" || reportLoaded) && (
              <select
                className="tca-time-range-time-input"
                disabled={reportLoaded}
                type="text"
                value={fromTime}
                onChange={props.onFromTimeChange}
              >
                {_.map(fromTimes, time => <option key={time}> {time} </option>)}
              </select>
            )}
          </div>
          <div>
            <label className="tca-time-range-label"> To </label>
            <DatePicker
              className="tca-time-rage-date-input"
              disabled={reportLoaded}
              onChange={onToDateChange}
              date={toDate}
              startDate={toDateStartDate.format(dateFmt)}
              endDate={toDateEndDate.format(dateFmt)}
            />
            {(within == "customDateTime" || reportLoaded) && (
              <select
                className="tca-time-range-time-input"
                disabled={reportLoaded}
                type="text"
                value={toTime}
                onChange={props.onToTimeChange}
              >
                {_.map(toTimes, time => <option key={time}> {time} </option>)}
              </select>
            )}
          </div>
        </div>
      );
    }

    function TimeZoneView(props) {
      return (
        <div>
          <label className="tca-label tca-time-range-label"> In </label>
          <select
            className="tca-select-input tca-time-range-tz"
            disabled={props.reportLoaded}
            value={props.timeZone}
            onChange={props.onTimeZoneChange}
          >
            {_.map(moment.tz.names(), name => (
              <option key={name}> {name} </option>
            ))}
          </select>
        </div>
      );
    }

    function LoadContentView(props) {
      const isActive = props.reportLoaded && !props.hasVerbatims;
      return (
        <form className={`tca-form ${isActive ? "is-active" : ""}`}>
          <fieldset>
            <legend> Load Content </legend>
            <label> Request (Up To) </label>
            <select
              disabled={!isActive}
              value={props.numTweets}
              onChange={props.onNumTweetsChange}
            >
              {_.map(_.range(1000, 25500, 500), i => (
                <option key={i}>{i}</option>
              ))}
            </select>
            <label>Tweets</label>
            <div>
              <button
                type="button"
                className="tca-button"
                onClick={props.onLoadContentClick}
                disabled={props.active}
              >
                Load Tweets
              </button>
            </div>
          </fieldset>
        </form>
      );
    }

    function AudienceInsightView(props) {
      const { numSnapshots, totalSnapshots } = props;
      return (
        <form
          className={
            (props.active ? "is-active" : "") + "tca-form tca-audience-insights"
          }
        >
          <fieldset>
            <legend>Audience Insights</legend>
            <button
              type="button"
              disabled={!props.active}
              className="tca-button"
              onClick={props.onAudienceAnalysisClick}
            >
              View Audience Analysis
            </button>
            <div className="tca-label">
              {`${numSnapshots} of ${totalSnapshots} Snapshots Remain`}
            </div>
          </fieldset>
        </form>
      );
    }

    function StartOverButtonView(props) {
      return (
        <button
          type="button"
          className="tca-button"
          onClick={props.onStartOverClick}
        >
          Start Over
        </button>
      );
    }

    class DatePicker extends React.Component {
      componentDidMount() {
        this.$el = $(this.el);
        const datepicker = this.$el.datepicker({
          format: "mm/dd/yyyy",
          autoclose: true,
          defaultDate: false,
          keyboardNavigation: false,
          startDate: this.props.startDate,
          endDate: this.props.endDate
        });
        this.handleChange = this.handleChange.bind(this);
        datepicker.on("changeDate", this.handleChange);
      }

      componentWillUnmount() {
        this.$el.off("changeDate", this.handleChange);
        this.$el.datepicker("destroy");
      }

      handleChange(e) {
        this.props.onChange(e.target.value);
      }

      render() {
        if (this.$el != null) {
          this.$el.datepicker("setStartDate", this.props.startDate);
          this.$el.datepicker("setEndDate", this.props.endDate);
        }
        return (
          <div>
            <input
              type="text"
              readOnly={true}
              disabled={this.props.disabled}
              value={this.props.date}
              className={this.props.className}
              ref={el => (this.el = el)}
            />
          </div>
        );
      }
    }

    return {
      CountTweetsView: CountTweetsView,
      LoadContentView: LoadContentView,
      AudienceInsightView: AudienceInsightView,
      StartOverButtonView: StartOverButtonView
    };
  }
);