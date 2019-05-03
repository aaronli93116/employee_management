import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import image from "../../default-image";
import "./style.css";
import { Row, Col, Container } from "react-bootstrap";

class Individual extends Component {
  handleDelete = (id, itemPerPage, sortBy, order) => {
    this.props.deleteOne(id, itemPerPage, sortBy, order);
  };
  render() {
    var editPath = {
      pathname: "/edit",
      state: {
        _id: this.props._id,
        photo: this.props.photo,
        name: this.props.name,
        title: this.props.title,
        sex: this.props.sex,
        startDate: this.props.startDate,
        officePhone: this.props.officePhone,
        cellPhone: this.props.cellPhone,
        SMS: this.props.SMS,
        email: this.props.email,
        managerId: this.props.managerId,
        managerName: this.props.managerName,
        numberDR: this.props.numberDR,
        reportList: this.props.reportList
      }
    };
    return (
      <tr style={{ height: 80 }}>
        <td>
          {!this.props.photo ? (
            <img src={image} alt="default avatar" className="show-img" />
          ) : (
            <img src={this.props.photo} alt="avatar" className="show-img" />
          )}
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.title}</td>
        <td>{this.props.sex}</td>
        <td>{this.props.startDate}</td>
        <td>
          <a href={`tel:${this.props.officePhone}`}>{this.props.officePhone}</a>
        </td>
        <td>
          <a href={`tel:${this.props.cellPhone}`}>{this.props.cellPhone}</a>
        </td>
        <td>{this.props.SMS}</td>
        <td>
          <a href={`mailto:${this.props.email}`}>{this.props.email}</a>
        </td>
        {this.props.managerId === null ? (
          <td>------</td>
        ) : (
          <td>
            <Link
              to={{ pathname: "/" }}
              onClick={() => this.props.getManager(this.props.managerId)}
            >
              {this.props.managerName}
            </Link>
          </td>
        )}
        {this.props.numberDR > 0 ? (
          <td>
            <Link
              to={{ pathname: "/" }}
              onClick={() => this.props.getSubordinate(this.props._id)}
            >
              {this.props.numberDR}
            </Link>
          </td>
        ) : (
          <td>{this.props.numberDR}</td>
        )}
        <td>
          <Link to={editPath}>
            <button
              style={{ backgroundColor: "#dcdcdc" }}
              type="button"
              className="btn"
              aria-label="Left Align"
            >
              <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
              Edit
            </button>
          </Link>
        </td>
        <td>
          <button
            style={{ backgroundColor: "#dcdcdc" }}
            type="button"
            className="btn"
            aria-label="Left Align"
            onClick={() =>
              this.handleDelete(
                this.props._id,
                this.props.itemPerPage,
                this.props.sortBy,
                this.props.order
              )
            }
          >
            <span
              className="glyphicon glyphicon-remove-circle"
              aria-hidden="true"
            />
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employeeReducer.employees,
    sortBy: state.employeeReducer.sortBy,
    order: state.employeeReducer.order,
    itemPerPage: state.employeeReducer.itemPerPage,
    hasMore: state.employeeReducer.hasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteOne: (id, itemPerPage, sortBy, order) => {
      dispatch(actions.deleteOne(id, itemPerPage, sortBy, order));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Individual);
