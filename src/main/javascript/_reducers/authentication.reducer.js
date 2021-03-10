import { userConstants } from "../_constants";

export function authentication(
  state = {
    loggedIn: false,
    loggingIn: false,
    error: false,
    user: null,
  },
  action
) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return { ...state, loggingIn: true };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        error: false,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return { ...state, loggedIn: false, loggingIn: false, error: true };
    case userConstants.LOGOUT:
      return { loggedIn: false, loggingIn: false, error: false, user: null };
    default:
      return {...state};
  }
}
