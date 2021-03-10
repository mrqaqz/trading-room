import { userConstants } from "../_constants";
import { userService } from "../_services";

export const userActions = {
  getUserInfo,
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  isAuthenticated: isAuthenticated,
  getOne,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request());

    userService.signin(username, password).then(
      () => {
        userService.getUserInfo().then((user) => dispatch(success(user)));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function getUserInfo() {
  return (dispatch) => {
    dispatch(request());

    userService.getUserInfo().then(
      (user) => {
        dispatch(success(user));
        dispatch({ type: userConstants.LOGIN_SUCCESS, user });
      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: userConstants.GET_ONE_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_ONE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_ONE_FAILURE, error };
  }
}
function logout() {
  return (dispatch) => {
    userService.signout();
    dispatch({ type: userConstants.LOGOUT });
  };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll(page, sort) {
  return (dispatch) => {
    dispatch(request());

    userService.getAll(page, sort).then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

function getOne(id) {
  return (dispatch) => {
    dispatch(request());

    userService.getOne(id).then(
      (user) => dispatch(success(user)),
      (error) => dispatch(failure(error))
    );
  };
  function request() {
    return { type: userConstants.GET_SINGLE_USER_REQUEST };
  }
  function success(user) {
    return { type: userConstants.GET_SINGLE_USER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GET_SINGLE_USER_FAILURE, error };
  }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}

function isAuthenticated() {
  return userService.isAuthenticated();
}
