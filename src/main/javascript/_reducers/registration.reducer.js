import { userConstants } from "../_constants";

export function registration(
  state = { registered: false, registering: true },
  action
) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return { registered: true };
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return { ...state };
  }
}
