const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Employees = require("../model/Schema");

const router = express.Router();

router.use(bodyParser.json());

router.get("/employees", (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(employees);
    }
  });
});

router.get("/employees/:curPage/:itemPerPage/:sortBy/:order", (req, res) => {
  var curPage = parseInt(req.params.curPage);
  //console.log("jinru" + curPage);
  var itemPerPage = parseInt(req.params.itemPerPage);
  var sortBy = req.params.sortBy;
  var order = req.params.order;

  //console.log("server" + sortBy);

  if (sortBy === "null" || order === "null") {
    Employees.find({})
      .skip((curPage - 1) * itemPerPage)
      .limit(itemPerPage)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else if (order === "ascending" || order === "descending") {
    let obj = {};
    obj[sortBy] = order === "ascending" ? 1 : -1;
    Employees.find({})
      .sort(obj)
      .skip((curPage - 1) * itemPerPage)
      .limit(itemPerPage)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(500).send({ err: "illegal order" });
  }
});

router.get("/getById/:employee_id", (req, res) => {
  // console.log("server");
  Employees.findById(req.params.employee_id, (err, result) => {
    if (err) res.status(500).send(err);
    else res.status(200).json([result]);
  });
});

router.get("/subordinate/:employee_id", (req, res) => {
  //console.log("server");
  Employees.findById(req.params.employee_id, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      var list = result.reportList;
      Employees.find({ _id: { $in: list } }, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

router.get("/search/", (req, res) => {
  Employees.find({}, (err, employees) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(employees);
    }
  });
});

router.get("/search/:searchKey", (req, res) => {
  var search = req.params.searchKey;
  var pre = "^.*";
  var pos = ".*$";
  Employees.find(
    {
      $or: [
        { officePhone: { $regex: new RegExp(pre + search + pos, "i") } },
        { cellPhone: { $regex: new RegExp(pre + search + pos, "i") } },
        { SMS: { $regex: new RegExp(pre + search + pos, "i") } },
        { startDate: { $regex: new RegExp(pre + search + pos, "i") } },
        { name: { $regex: new RegExp(pre + search + pos, "i") } },
        { title: { $regex: new RegExp(pre + search + pos, "i") } },
        { sex: { $regex: new RegExp(pre + search + pos, "i") } },
        { startDate: { $regex: new RegExp(pre + search + pos, "i") } },
        { email: { $regex: new RegExp(pre + search + pos, "i") } },
        { managerName: { $regex: new RegExp(pre + search + pos, "i") } }
      ]
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

router.post("/employees", (req, res) => {
  //console.log("Create");
  if (!req.body.managerId) {
    let newUser = {
      ...req.body,
      managerId: null,
      managerName: null,
      reportList: []
    };
    Employees.create(newUser, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(newUser);
      }
    });
  } else {
    let newUser = { ...req.body, reportList: [] };
    Employees.create(newUser, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        Employees.findByIdAndUpdate(
          req.body.managerId,
          { $push: { reportList: data._id } },
          (err, e) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json(newUser);
            }
          }
        );
      }
    });
  }
});

router.get("/valid/:employee_id", (req, res) => {
  //console.log("begin");
  var employeeId = req.params.employee_id;
  Employees.findById(employeeId, (err, data) => {
    //console.log("manzu");
    if (err) res.status(500).send(err);
    else {
      if (data.reportList.length > 0) {
        //console.log("youxiashu");
        var invalid = [];
        var ans = [employeeId];
        async function findSubordinate() {
          while (ans.length !== 0) {
            let cur = ans.shift();
            invalid.push(cur);
            await Employees.findById(cur).then(e => {
              //console.log(e._doc);
              if (e._doc !== null) {
                ans = ans.concat(e._doc.reportList);
              }
            });
          }
          Employees.find({ _id: { $nin: [...invalid] } }, (err, result) => {
            if (err) {
              res.status(500).send(err);
            } else {
              res.status(200).json({ data: result.map(d => d._doc) });
            }
          });
        }
        findSubordinate();
      } else if (data.reportList.length === 0) {
        Employees.find({ _id: { $nin: [employeeId] } }, (err, result) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).json({ data: result.map(d => d._doc) });
          }
        });
      }
    }
  });
});

router.delete("/employees/:employeeId", (req, res) => {
  Employees.findByIdAndRemove(req.params.employeeId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (data.managerId !== null) {
        Employees.findByIdAndUpdate(
          data.managerId,
          { $pull: { reportList: { $in: [data._id] } } },
          err => {
            if (err) {
              res.status(500).send(err);
            }
          }
        );
      }
      if (data.reportList.length > 0) {
        data.reportList.forEach(sub => {
          Employees.findByIdAndUpdate(
            sub,
            { managerName: null, managerId: null },
            err => {
              if (err) res.status(500).send(err);
            }
          );
        });
      }
      res.status(200).json(data);
    }
  });
});

router.put("/employees/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const {
    managerName,
    oldManager,
    name,
    photo,
    title,
    sex,
    officePhone,
    cellPhone,
    SMS,
    email,
    startDate
  } = req.body;
  var managerId = req.body.managerId;
  //console.log(req.body);
  if (managerId === "none") managerId = null;
  if (managerId && !oldManager) {
    //console.log("change manager from null to someone");
    Employees.findByIdAndUpdate(
      employeeId,
      {
        managerName,
        managerId,
        name,
        photo,
        title,
        sex,
        officePhone,
        cellPhone,
        SMS,
        email,
        startDate
      },
      err => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employees.findByIdAndUpdate(
            managerId,
            { $push: { reportList: employeeId } },
            (err, e) => {
              if (err) {
                res.status(500).send(err);
              } else {
                Employees.findById(
                  employeeId,
                  { reportList: 1 },
                  (err, list) => {
                    if (err) {
                      res.status(500).send(err);
                    } else {
                      if (list.reportList.length > 0) {
                        Employees.update(
                          { _id: { $in: list.reportList } },
                          { $set: { managerName: name } },
                          { multi: true, upsert: false },
                          (err, raw) => {
                            if (err) res.status(500).send(err);
                            else res.status(200).json({ data: raw });
                          }
                        );
                      } else {
                        res.status(200).json({ data: list });
                      }
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else if (!managerId && oldManager) {
    Employees.findByIdAndUpdate(
      employeeId,
      {
        managerName: null,
        managerId: null,
        name,
        photo,
        title,
        sex,
        officePhone,
        cellPhone,
        SMS,
        email,
        startDate
      },
      err => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employees.findByIdAndUpdate(
            oldManager,
            { $pull: { reportList: { $in: [employeeId] } } },
            (err, e) => {
              if (err) {
                res.status(500).send(err);
              } else {
                Employees.findById(
                  employeeId,
                  { reportList: 1 },
                  (err, list) => {
                    if (err) {
                      res.status(500).json(err);
                    } else {
                      if (list.reportList.length > 0) {
                        Employees.update(
                          { _id: { $in: list.reportList } },
                          { $set: { managerName: name } },
                          { multi: true, upsert: false },
                          (err, raw) => {
                            if (err) res.status(500).send(err);
                            else res.status(200).json({ data: raw });
                          }
                        );
                      } else {
                        res.status(200).json({ data: list });
                      }
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else if (managerId === oldManager) {
    Employees.findByIdAndUpdate(
      employeeId,
      {
        name,
        photo,
        title,
        sex,
        officePhone,
        cellPhone,
        SMS,
        email,
        startDate
      },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employees.findById(employeeId, { reportList: 1 }, (err, list) => {
            if (err) {
              res.status(500).send(err);
            } else {
              if (list.reportList.length > 0) {
                Employees.update(
                  { _id: { $in: list.reportList } },
                  { $set: { managerName: name } },
                  { multi: true, upsert: false },
                  (err, raw) => {
                    if (err) res.status(500).send(err);
                    else res.status(200).json({ data: raw });
                  }
                );
              } else {
                res.status(200).json({ data: list });
              }
            }
          });
        }
      }
    );
  } else {
    //console.log("change manager from someone to someone");
    Employees.findByIdAndUpdate(
      employeeId,
      {
        managerId,
        managerName,
        name,
        photo,
        title,
        sex,
        officePhone,
        cellPhone,
        SMS,
        email,
        startDate
      },
      err => {
        if (err) {
          res.status(500).send(err);
        } else {
          Employees.findByIdAndUpdate(
            oldManager,
            { $pull: { reportList: { $in: [employeeId] } } },
            err => {
              if (err) res.status(500).json({ error: err });
              else {
                Employees.findByIdAndUpdate(
                  managerId,
                  { $push: { reportList: employeeId } },
                  (err, data) => {
                    if (err) res.status(500).json({ error: err });
                    else {
                      Employees.findById(
                        employeeId,
                        { reportList: 1 },
                        (err, list) => {
                          if (err) res.status(500).json({ error: err });
                          else {
                            if (list.reportList.length > 0) {
                              Employees.update(
                                { _id: { $in: list.reportList } },
                                { $set: { managerName: name } },
                                { multi: true, upsert: false },
                                (err, raw) => {
                                  if (err) res.status(500).json({ error: err });
                                  else res.status(200).json({ data: raw });
                                }
                              );
                            } else {
                              res.status(200).json({ data: list });
                            }
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

module.exports = router;
