import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../../default-image";

const getPhoto = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
};

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      name: "",
      title: "",
      sex: "male",
      startDate: "",
      officePhone: "",
      cellPhone: "",
      SMS: "",
      email: "",
      managerId: null,
      managerName: ""
    };
  }

  componentDidMount() {
    this.props.getManager();
  }

  // getPhoto = file => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  //     reader.readAsDataURL(file);
  //   });
  // };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePhotoChange = e => {
    if (e.target.value) {
      let file = e.target.files[0];
      getPhoto(file).then(base64 => {
        this.setState({ photo: base64 });
      });
    }
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSexChange = e => {
    this.setState({ sex: e.target.value });
  };

  handleDateChange = e => {
    this.setState({ startDate: e.target.value });
  };

  handleOfficePhoneChange = e => {
    this.setState({ officePhone: e.target.value });
  };

  handleCellPhoneChange = e => {
    this.setState({ cellPhone: e.target.value });
  };

  handleSMSChange = e => {
    this.setState({ SMS: e.target.value });
  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleManagerChange = e => {
    this.setState({
      managerId: e.target.value,
      managerName: e.target.options[e.target.selectedIndex].text
    });
  };

  handleSubmit = e => {
    //console.log("nengdiananniu");
    e.preventDefault();
    let user = {
      photo: this.state.photo,
      name: this.state.name,
      title: this.state.title,
      sex: this.state.sex,
      startDate: this.state.startDate,
      officePhone: this.state.officePhone,
      cellPhone: this.state.cellPhone,
      SMS: this.state.SMS,
      email: this.state.email,
      managerId: this.state.managerId,
      managerName: this.state.managerName
    };
    this.props.addNewOne(user, this.props.history);
  };

  render() {
    // console.log("aaaa");
    console.log(this.state.photo);
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ width: 200, margin: "20px auto" }}
      >
        <Form.Group controlId="photo">
          {this.state.photo === null ? (
            <img height="160px" alt="default avatar" src={image} />
          ) : (
            <img height="160px" alt="avatar" src={this.state.photo} />
          )}
          <Form.Control
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={this.handlePhotoChange}
          />
          <Form.Label>Upload photo</Form.Label>
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            onChange={this.handleNameChange}
          />
          {!/^[A-Za-z]+([ A-Za-z]+)*$/.test(this.state.name) &&
            this.state.name && <p style={{ color: "red" }}>invalid name </p>}
        </Form.Group>

        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="title"
            placeholder="title"
            onChange={this.handleTitleChange}
          />
          {!/^[a-zA-Z]+$/.test(this.state.title) && this.state.title && (
            <p style={{ color: "red" }}>invalid title </p>
          )}
        </Form.Group>

        <Form.Group controlId="sex">
          <Form.Label inline="true">sex:</Form.Label>
          <Form.Check
            inline="true"
            label="male"
            type="radio"
            value="male"
            checked={this.state.sex === "male"}
            onChange={this.handleSexChange}
          />
          <Form.Check
            inline="true"
            label="female"
            type="radio"
            value="female"
            checked={this.state.sex === "female"}
            onChange={this.handleSexChange}
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="date"
            onChange={this.handleDateChange}
          />
        </Form.Group>

        <Form.Group controlId="officePhone">
          <Form.Label>officePhone</Form.Label>
          <Form.Control
            type="officePhone"
            placeholder="officePhone"
            onChange={this.handleOfficePhoneChange}
          />
          {!/^\d{10}$/.test(this.state.officePhone) &&
            this.state.officePhone && (
              <p style={{ color: "red" }}>
                invalid office phone:please input 10 digits number
              </p>
            )}
        </Form.Group>

        <Form.Group controlId="cellPhone">
          <Form.Label>Cell Phone</Form.Label>
          <Form.Control
            type="title"
            placeholder="cell Phone"
            onChange={this.handleCellPhoneChange}
          />
          {!/^\d{10}$/.test(this.state.cellPhone) && this.state.cellPhone && (
            <p style={{ color: "red" }}>
              invalid cell phone:please input 10 digits number
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="SMS">
          <Form.Label>SMS</Form.Label>
          <Form.Control
            type="SMS"
            placeholder="SMS"
            onChange={this.handleSMSChange}
          />
          {!/^\d{10}$/.test(this.state.SMS) && this.state.SMS && (
            <p style={{ color: "red" }}>
              invalid SMS:please input 10 digits number
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            onChange={this.handleEmailChange}
          />
          {!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
            this.state.email
          ) &&
            this.state.email && (
              <p style={{ color: "red" }}>
                invalid email:please input valid email
              </p>
            )}
        </Form.Group>

        <Form.Group controlId="manager">
          <Form.Label>Manager:</Form.Label>
          <select onChange={this.handleManagerChange}>
            <option value={null}>None</option>
            {this.props.employees
              .sort((a, b) => {
                return a.name.localeCompare(b.name);
              })
              .map(manager => {
                return (
                  <option key={manager._id} value={manager._id}>
                    {manager.name}
                  </option>
                );
              })}
          </select>
        </Form.Group>

        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Button
          variant="primary"
          type="submit"
          disabled={
            !/^\d{10}$/.test(this.state.SMS) ||
            !/^\d{10}$/.test(this.state.officePhone) ||
            !/^\d{10}$/.test(this.state.cellPhone) ||
            !/^[A-Za-z]+([ A-Za-z]+)*$/.test(this.state.name) ||
            !/^[a-zA-Z]+$/.test(this.state.title) ||
            !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
              this.state.email
            ) ||
            !/^(male|female)$/.test(this.state.sex.toLocaleLowerCase()) ||
            !this.state.name ||
            !this.state.sex ||
            !this.state.title ||
            !this.state.startDate ||
            !this.state.officePhone ||
            !this.state.cellPhone ||
            !this.state.SMS ||
            !this.state.email
          }
        >
          Submit
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewOne: (user, history) => {
      dispatch(actions.addNewOne(user, history));
    },
    getManager: () => {
      dispatch(actions.getEmployees());
    }
  };
};

const mapStateToProps = state => {
  return {
    employees: state.employeeReducer.employees
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
