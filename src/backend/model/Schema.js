const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const EmployeeSchema = new Schema({
  photo: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  sex: {
    type: String,
    default: null
  },
  startDate: {
    type: String,
    default: null
  },
  officePhone: {
    type: String,
    default: null
  },
  cellPhone: {
    type: String,
    default: null
  },
  SMS: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  managerName: {
    type: String,
    default: null
  },
  managerId: {
    type: String,
    default: null
  },
  reportList: {
    type: [ObjectId],
    default: []
  }
});

var Employee = mongoose.model("employee", EmployeeSchema, "employee");

module.exports = Employee;
