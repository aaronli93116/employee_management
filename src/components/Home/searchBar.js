import React, { Component } from "react";
import { FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../Actions";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
  }
  handleSearchChange = e => {
    this.setState({ searchInput: e.target.value });
    this.props.searchKeyWord(e.target.value);
  };

  render() {
    return (
      <div className="div-container">
        <FormControl
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchKeyWord: key => {
      dispatch(actions.searchKeyWord(key));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
