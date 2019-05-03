import React, { Component } from "react";
import Individual from "./row";
import * as actions from "../../Actions";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

class Table extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     page: 1,
  //     data: this.props.data,
  //     hasMore: true,
  //     itemPerPage: 5,
  //     scrolling: false
  //   };
  //   console.log(this.state);
  // }
  componentDidMount() {
    this.props.getInitialData(
      this.props.curPage,
      this.props.itemPerPage,
      this.props.sortBy,
      this.props.order
    );
    //this.props.getData();
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("did" + this.props.curPage);
    if (
      prevProps.sortBy !== this.props.sortBy ||
      prevProps.order !== this.props.order
    ) {
      this.props.getInitialData(
        this.props.curPage,
        this.props.itemPerPage,
        this.props.sortBy,
        this.props.order
      );
    }
  }

  _loadMore = () => {
    //this.setState({ scrolling: true });
    console.log("loadMore");
    // setTimeout(() => {
    this.fetchMoreData();
    // }, 1500);
  };

  fetchMoreData = () => {
    this.setState({ page: this.state.page + 1 });
    axios({
      method: "get",
      url: `http://localhost:8888/employees/${this.state.page}/${
        this.state.itemPerPage
      }/${this.props.sortBy}/${this.props.order}`
    })
      .then(response => {
        if (response.data.length > 0)
          this.setState({ data: this.state.data.concat(response.data) });
        else {
          this.setState({ hasMore: false });
        }
      })
      .catch(e => {
        this.setState({ page: this.state.page - 1 });
        alert(e);
      });
  };

  sortOnClick = sortBy => {
    this.props.sortOnClick(sortBy);
  };

  render() {
    //var show = this.state.scrolling ? this.state.data : this.props.employees;
    console.log(this.props.data);
    return (
      // <InfiniteScroll
      //   dataLength={this.props.data.length}
      //   next={this._loadMore}
      //   hasMore={this.state.hasMore}
      //   loader={<h4>Loading...</h4>}
      //   endMessage={
      //     <p style={{ textAlign: "center" }}>
      //       <b>Yay! You have seen it all</b>
      //     </p>
      //   }
      // >
      //   <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th />
            <th
              onClick={() => {
                this.sortOnClick("name");
              }}
            >
              Name
              {this.props.sortBy === "name" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("title");
              }}
            >
              Title
              {this.props.sortBy === "title" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("sex");
              }}
            >
              Sex
              {this.props.sortBy === "sex" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("startDate");
              }}
            >
              Start Date
              {this.props.sortBy === "startDate" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("officePhone");
              }}
            >
              Office Phone
              {this.props.sortBy === "officePhone" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("cellPhone");
              }}
            >
              Cell Phone
              {this.props.sortBy === "cellPhone" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("SMS");
              }}
            >
              SMS
              {this.props.sortBy === "SMS" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th
              onClick={() => {
                this.sortOnClick("email");
              }}
            >
              Email
              {this.props.sortBy === "email" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th>Manager</th>
            <th
              onClick={() => {
                this.sortOnClick("directReports");
              }}
            >
              # of DR
              {this.props.sortBy === "directReports" &&
                (this.props.order === "ascending" ? (
                  <i className="fas fa-angle-double-up" />
                ) : (
                  <i className="fas fa-angle-double-down" />
                ))}
            </th>
            <th />
            <th />
          </tr>
        </thead>
        {/* <InfiniteScroll
          dataLength={this.state.data.length}
          next={this._loadMore}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        > */}
        <tbody>
          {this.props.employees.map((employee, index) => {
            return (
              <Individual
                key={index}
                _id={employee._id}
                name={employee.name}
                title={employee.title}
                sex={employee.sex}
                officePhone={employee.officePhone}
                cellPhone={employee.cellPhone}
                SMS={employee.SMS}
                email={employee.email}
                numberDR={employee.reportList.length}
                photo={employee.photo}
                reportList={employee.reportList}
                managerId={employee.managerId}
                managerName={employee.managerName}
                startDate={employee.startDate}
                getManager={this.props.getUserById}
                getSubordinate={this.props.getSubordinate}
              />
            );
          })}
        </tbody>

        {/* </InfiniteScroll> */}
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    curPage: state.employeeReducer.curPage,
    employees: state.employeeReducer.employees,
    sortBy: state.employeeReducer.sortBy,
    order: state.employeeReducer.order,
    itemPerPage: state.employeeReducer.itemPerPage
    // hasMore: state.employeeReducer.hasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getInitialData: (curPage, itemPerPage, sortBy, order) => {
      dispatch(actions.getInitialData(curPage, itemPerPage, sortBy, order));
    },
    sortOnClick: sortBy => {
      dispatch(actions.sortEle(sortBy));
    },
    getUserById: id => {
      dispatch(actions.getUserById(id));
    },
    getSubordinate: list => {
      dispatch(actions.getReportsDetail(list));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
