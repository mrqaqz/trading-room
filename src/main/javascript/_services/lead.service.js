import axios from "../_helpers/axios";
import httpStatus from "http-status";

export const leadService = {
  getAll,
  countUnreadLeads,
  getLead,
  getByUserId,
};

function getAll(page) {
  return axios
    .get("/lead/find/lazy", {
      params: {
        page: page,
      },
    })
    .then(handleResponse)
    .then((leads) => {
      return leads;
    });
}

function getLead(id) {
  return axios
    .get("/lead/" + id)
    .then(handleResponse)

    .then((lead) => {
      return lead;
    });
}

function countUnreadLeads(user) {
  return axios
    .get("/leads/find/unread/" + user.id)
    .then(handleResponse)
    .then((response) => {
      return response;
    });
}

function getByUserId(id, page) {
  return axios
    .get("/lead/user/" + id, {
      params: {
        page: page,
      },
    })
    .then(handleResponse)
    .then(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
}
function handleResponse(response) {
  if ((response.status = httpStatus.OK)) {
    const { data } = response;
    return data;
  } else {
    const { error } = response;

    return Promise.reject(error);
  }
}
