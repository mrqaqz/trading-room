import { productConstants } from "../_constants";
import { productService } from "../_services";

export const productActions = {
  getAll,
  getFullList,
  getOne,
  placeOrder,
  registerProduct,
};

function getAll(page, sort) {
  return (dispatch) => {
    dispatch(requestAllProducts());

    if (page === undefined) {
      page = 0;
    }
    productService.getAll(page, sort).then(
      (products) => {
        dispatch(success(products));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function requestAllProducts() {
    return { type: productConstants.GET_PRODUCTS_REQUEST };
  }

  function success(products) {
    return { type: productConstants.GET_PRODUCTS_SUCCESS, payload: products };
  }

  function failure(error) {
    return { type: productConstants.GET_PRODUCTS_FAILURE, error };
  }
}

function getFullList(page, sort) {
  return (dispatch) => {
    dispatch(request());
    productService.getFullList(page, sort).then(
      (productList) => {
        dispatch(success(productList));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: productConstants.GET_ALL_PRODUCTS_REQUEST };
  }

  function success(productList) {
    return {
      type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
      payload: productList,
    };
  }

  function failure(error) {
    return { type: productConstants.GET_ALL_PRODUCTS_FAILURE, error };
  }
}

function getOne(id) {
  return (dispatch) => {
    dispatch(request());
    productService.getOne(id).then(
      (product) => {
        dispatch(success(product));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: productConstants.GET_ONE_PRODUCTS_REQUEST };
  }

  function success(product) {
    return {
      type: productConstants.GET_ONE_PRODUCTS_SUCCESS,
      payload: product,
    };
  }

  function failure(error) {
    return { type: productConstants.GET_ONE_PRODUCTS_FAILURE, error };
  }
}

function placeOrder(productId, address, userId, province, qty) {
  productService
    .placeOrder(productId, address, userId, province, qty)
    .then((response) => {
      return response;
    });
}

function registerProduct(product) {
  productService.registerProduct(product);
}
