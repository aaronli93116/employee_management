const initialState = {
  managers: [],
  isFetching: false,
  err: null
};
const managerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MANAGER_FETCH_START": {
      return {
        ...state,
        isFetching: true
      };
    }
    case "MANAGER_FETCH_FAIL": {
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    }
    case "MANAGER_FETCH_SUCCESS": {
      return {
        ...state,
        isFetching: false,
        err: null,
        managers: action.data.data
      };
    }
    default:
      return state;
  }
};

export default managerReducer;
