/** @jsx React.DOM */

var EditableCell = React.createClass({
  getInitialState: function() {
    return {
      isEditMode: false,
      data: ""
    };
  },
  componentWillMount: function() {
    this.setState({
      isEditMode: this.props.isEditMode,
      data: this.props.data
    });
  },
  handleEditCell: function(evt) {
    this.setState({ isEditMode: true });
  },
  handleKeyDown: function(evt) {
    switch (evt.keyCode) {
      case 13: // Enter
      case 9: // Tab
        this.setState({ isEditMode: false });
        break;
    }
  },
  handleChange: function(evt) {
    this.setState({ data: evt.target.value });
  },
  render: function() {
    var cellHtml;
    if (this.state.isEditMode) {
      cellHtml = (
        <input
          type="text"
          value={this.state.data}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
        />
      );
    } else {
      cellHtml = <div onClick={this.handleEditCell}>{this.state.data}</div>;
    }
    return <td>{cellHtml}</td>;
  }
});

var Movie = React.createClass({
  render: function() {
    return (
      <tr>
        <EditableCell data={this.props.title} />
        <EditableCell data={this.props.rank} />
        <EditableCell data={this.props.year} />
        <EditableCell data={this.props.rating} />
        <EditableCell data={this.props.reviews} />
      </tr>
    );
  }
});

var MovieList = React.createClass({
  getInitialState: function() {
    return { data: this.props.data };
  },
  render: function() {
    var movies = this.state.data.map(function(movie) {
      return (
        <Movie
          title={movie.title}
          rank={movie.rank}
          year={movie.year}
          rating={movie.rating}
          reviews={movie.reviews}
        />
      );
    });
    return <tbody>{movies}</tbody>;
  }
});

React.renderComponent(
  <table>
    <thead>
      <tr>
        <th>Movie Title</th> <th>Rank</th>
        <th>Year</th>
        <th>Reviews</th>
      </tr>
    </thead>
    <MovieList
      data={[
        {
          title: "Citizen Kane",
          rank: "1",
          year: "1941",
          rating: "96%",
          reviews: "155"
        },
        {
          title: "The Shawshank Redemption",
          rank: "2",
          year: "1995",
          rating: "95%",
          reviews: "145"
        },
        {
          title: "The Godfather",
          rank: "3",
          year: "1971",
          rating: "94%",
          reviews: "178"
        }
      ]}
    />
  </table>,
  document.body
);
