import { userConstants } from "../_constants";

export function users(state = { loading: true, user: null }, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return { ...state, loading: true };
    case userConstants.GETALL_SUCCESS:
      return { ...state, loading: false, userList: action.users };
    case userConstants.GETALL_FAILURE:
      return { ...state, error: action.error };

    case userConstants.GET_ONE_REQUEST:
      return { ...state, loading: true };
    case userConstants.GET_ONE_SUCCESS:
      return { ...state, loading: false };
    case userConstants.GET_ONE_FAILURE:
      return { ...state, error: action.error };

    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        ...state,
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };

    case userConstants.GET_SINGLE_USER_REQUEST:
      return { ...state, loading: false };

    case userConstants.GET_SINGLE_USER_SUCCESS:
      return { ...state, loading: true, user: action.user };

    case userConstants.GET_SINGLE_USER_FAILURE:
      return { ...state, loading: true, error: action.error };
    default:
      return { ...state };
  }
}
