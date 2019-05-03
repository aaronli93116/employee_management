const initialState = {
  itemPerPage: 10,
  curPage: 1,
  hasMore: true,
  employees: [],
  data: [],
  isFetching: false,
  err: null,
  sortBy: null,
  order: null
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_FETCH_START":
      //console.log("star");
      return {
        ...state,
        isFetching: true
      };
    case "EMPLOYEE_FETCH_FAIL":
      //console.log("fail");
      return {
        ...state,
        error: action.error,
        isFetching: false
      };
    case "USER_FETCH_SUCCESS":
      //console.log(action.data);
      //console.log("succ");
      return {
        ...state,
        isFetching: false,
        err: null,
        employees: action.data,
        data: action.data
      };

    case "SORT": {
      if (state.sortBy !== action.sortBy) {
        return {
          ...state,
          sortBy: action.sortBy,
          order: "ascending"
        };
      } else {
        if (state.order === "ascending") {
          return {
            ...state,
            order: "descending"
          };
        } else {
          return {
            ...state,
            order: "ascending"
          };
        }
      }
    }
    case "LOAD_MORE":
      return {
        ...state,
        curPage: state.curPage + 1
      };

    default:
      return state;
  }
};

export default employeeReducer;
