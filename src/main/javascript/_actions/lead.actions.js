import { leadConstants } from "../_constants";
import { leadService } from "../_services";

export const leadActions = {
  getAll,
  countUnreadLeads,
  getLead,
  getByUser,
};

function getAll(page) {
  return (dispatch) => {
    dispatch(request());

    leadService.getAll(page).then(
      (leads) => {
        dispatch(success(leads));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: leadConstants.LEAD_REQUEST };
  }

  function success(leads) {
    return {
      type: leadConstants.LEAD_SUCCESS,
      payload: leads,
    };
  }
  function failure(error) {
    return { type: leadConstants.LEAD_FAIL, error };
  }
}

function countUnreadLeads(sort) {
  return (dispatch) => {
    dispatch(request());

    leadService.countUnreadLeads(sort).then(
      (numberOfUnread) => {
        dispatch(success(numberOfUnread));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: leadConstants.lead_NUMBER_REQUEST };
  }

  function success(numberOfUnread) {
    return {
      type: leadConstants.lead_NUMBER_SUCCESS,
      payload: numberOfUnread,
    };
  }
  function failure(error) {
    return { type: leadConstants.lead_NUMBER_FAIL, error };
  }
}

function getLead(id) {
  return (dispatch) => {
    dispatch(request());

    leadService.getLead(id).then(
      (lead) => dispatch(success(lead)),
      (error) => dispatch(failure(error))
    );
    function request() {
      return { type: leadConstants.GET_LEAD_REQUEST };
    }
    function success(lead) {
      return { type: leadConstants.GET_LEAD_SUCCESS, payload: lead };
    }
    function failure(error) {
      return { type: leadConstants.GET_LEAD_FAIL, error: error };
    }
  };
}

function getByUser(id, page) {
  return (dispatch) => {
    dispatch(request());

    leadService.getByUserId(id, page).then(
      (leads) => dispatch(success(leads)),
      (error) => dispatch(failure(error))
    );
    function request() {
      return { type: leadConstants.GET_LEAD_BY_USERID_REQUEST };
    }
    function success(leads) {
      return {
        type: leadConstants.GET_LEAD_BY_USERID_SUCCESS,
        payload: leads,
      };
    }
    function failure(error) {
      return { type: leadConstants.GET_LEAD_BY_USERID_FAIL, error: error };
    }
  };
}
