import httpStatus from "http-status";
import auth0 from "../auth0";
import axios from "../_helpers/axios";

export const userService = {
  signin,
  signout,
  handleAuthentication,
  getUserInfo,
  register,
  getAll,
  getOne
};

function signin(username, password) {
  return axios
    .post("/login", {
      username: username,
      password,
    })
    .then((response) => {
      sessionStorage.setItem(
        "AuthToken",
        response.headers.authorization.toString()
      );
    });
}

function getUserInfo() {
  let token = sessionStorage.getItem("AuthToken");
    return axios({
    method: "get",
    url: "/users/me",
    headers: { Authorization: token },
  })
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}
function signout() {
  // Clear access token and ID token from local storage
  axios.get("/logout");
  sessionStorage.clear();
}

function register(user) {
  let userModel = { ...user, userRole: "BUYER" };
  return axios
    .post("/users/sign-up", userModel)
    .then((response) => console.log(response));
}

function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        return resolve();
      } else if (err) {
        console.log(err);
        return reject(err);
      }
    });
  });
}
function getAll(page, sort) {
  return axios
    .get("/api/applicationUsers", {
      page: page,
      sort: sort,
    })
    .then(handleResponse)
    .then((userList) => {
      return userList;
    });
}

function getOne(id) {
  return axios
    .get("/users/" + id)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
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
