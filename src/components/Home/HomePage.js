import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "./searchBar";
import EmployeeTable from "./table";
import { Link } from "react-router-dom";
import * as actions from "../../Actions";

class Home extends Component {
  // componentDidMount() {
  //   this.props.getInitialData(1, 5, null, null);
  //   //this.props.getData();
  // }
  render() {
    //console.log(this.props.data);
    return (
      <div className="div-container">
        <div style={{ width: "60%", float: "left" }}>
          <SearchBar />
        </div>
        <div className="div-container" style={{ width: "40%", float: "right" }}>
          <button
            className="ui grey basic button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset Filter
          </button>
          <button className="btn btn-success">
            <span className="glyphicon glyphicon-user" aria-hidden="true" />
            <Link to="/create">Create NewOne</Link>
          </button>
        </div>
        <div>
          <EmployeeTable />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.employeeReducer.isFetching,
    err: state.employeeReducer.err,
    data: state.employeeReducer.employees
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getInitialData: (curPage, itemPerPage, sortBy, order) => {
//       dispatch(actions.getInitialData(curPage, itemPerPage, sortBy, order));
//     }
//   };
// };
export default connect(
  mapStateToProps,
  null
)(Home);
