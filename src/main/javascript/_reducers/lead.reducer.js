import { leadConstants } from "../_constants";

export function leads(
  state = {
    loading: true,
  },
  action
) {
  switch (action.type) {
    case leadConstants.LEAD_REQUEST: {
      return { ...state, loading: true };
    }
    case leadConstants.LEAD_SUCCESS: {
      return { ...state, leads: action.payload, loading: false };
    }

    case leadConstants.LEAD_FAIL:
      return { ...state, loading: false, error: action.error };

    
    
      case leadConstants.LEAD_NUMBER_FAIL: {
      return { ...state, loading: false, error: action.error };
    }

    //loading here has to be the opposite of the one above.
    case leadConstants.GET_LEAD_REQUEST: {
      return { ...state, loading: false };
    }
    case leadConstants.GET_LEAD_SUCCESS: {
      //success
      return { ...state, lead: action.payload, loading: true };
    }
    case leadConstants.GET_LEAD_FAIL: {
      return { ...state, error: action.error, loading: true };
    }

    //Get leads by user ID
    case leadConstants.GET_LEAD_BY_USERID_REQUEST: {
      return { ...state, loading: true };
    }
    case leadConstants.GET_LEAD_BY_USERID_SUCCESS: {
      //success
      return { ...state, userleads: action.payload ,  loading: false};
    }
    case leadConstants.GET_LEAD_BY_USERID_FAIL: {
      return { ...state, error: action.error,  loading: false };
    }
    default:
      return {
        ...state,
      };
  }
}
