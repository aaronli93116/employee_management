import axios from "axios";

export function requestStart() {
  return {
    type: "USER_FETCH_START"
  };
}
export function requestSuccess(response) {
  return {
    type: "USER_FETCH_SUCCESS",
    data: response.data
  };
}
export function requestFail(error) {
  return {
    type: "EMPLOYEE_FETCH_FAIL",
    error
  };
}

export const getManagerStart = () => {
  return {
    type: "MANAGER_FETCH_START"
  };
};
export const getManagerSuccess = response => {
  return {
    type: "MANAGER_FETCH_SUCCESS",
    data: response.data
  };
};
export const getManagerFail = err => {
  return {
    type: "MANAGER_FETCH_FAIL",
    err
  };
};

export const getInitialData = (
  curPage,
  itemPerPage,
  sortBy,
  order
) => dispatch => {
  //console.log("cli" + sortBy);
  dispatch(requestStart());
  return axios
    .get(
      `http://localhost:8888/employees/${curPage}/${itemPerPage}/${sortBy}/${order}`
    )
    .then(res => {
      dispatch(requestSuccess(res));
    })
    .catch(err => {
      dispatch(requestFail(err));
    });
};

export function getUserById(id) {
  //console.log("byId");
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`http://localhost:8888/getById/${id}`)
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

export function getOne(response) {
  return {
    type: "GET_EMPLOYEE",
    data: response.data
  };
}

export const searchKeyWord = searchKey => {
  //console.log(searchKey);
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`http://localhost:8888/search/${searchKey}`)
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export function addNewOne(user, history) {
  // console.log(history);
  return dispatch => {
    dispatch(requestStart());
    axios
      .post("http://localhost:8888/employees", {
        photo: user.photo,
        name: user.name,
        title: user.title,
        sex: user.sex,
        startDate: user.startDate,
        officePhone: user.officePhone,
        cellPhone: user.cellPhone,
        SMS: user.SMS,
        email: user.email,
        managerId: user.managerId,
        managerName: user.managerName
      })
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        console.log("err");
        dispatch(requestFail(err));
      });
  };
}

export const getReportsDetail = id => {
  //console.log("client");
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`http://localhost:8888/subordinate/${id}`)
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export const getEmployees = () => {
  return dispatch => {
    dispatch(requestStart());
    axios
      .get("http://localhost:8888/employees")
      .then(response => {
        dispatch(requestSuccess(response));
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
};

export const sortEle = sortBy => {
  //console.log(sortBy);
  return {
    type: "SORT",
    sortBy: sortBy
  };
};

export function deleteOne(id, pagesize, sortBy, order) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .delete("http://localhost:8888/employees/" + id, {
        id: id
      })
      .then(response => {
        dispatch(getInitialData(pagesize, sortBy, order));
        //dispatch(getData());
      })
      .catch(err => {
        dispatch(requestFail(err));
      });
  };
}

// export function getData() {
//   return (dispatch, store) => {
//     dispatch(requestStart());
//     axios
//       .get("http://localhost:8888/employees")
//       .then(response => {
//         dispatch(requestSuccess(response));
//       })
//       .catch(err => {
//         dispatch(requestFail(err));
//       });
//   };
// }

export const getValidManager = id => {
  //console.log(id);
  return dispatch => {
    dispatch(getManagerStart());
    axios
      .get(`http://localhost:8888/valid/${id}`)
      .then(response => {
        dispatch(getManagerSuccess(response));
      })
      .catch(err => {
        dispatch(getManagerFail(err));
      });
  };
};

export function editOne(id, data, history) {
  return dispatch => {
    dispatch(requestStart());
    axios({
      method: "put",
      url: `http://localhost:8888/employees/${id}`,
      data: data
    })
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        console.log("err");
        dispatch(requestFail(err));
      });
  };
}

// export function _loadMore() {
//   console.log("loadmore action");
//   return {
//     type: "LOAD_MORE"
//   };
// }
