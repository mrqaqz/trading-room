import { productConstants } from "../_constants";

export function products(state = { loading: true, productList: null }, action) {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
      };

    case productConstants.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case productConstants.GET_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      return { ...state, loading: false };

    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, loading: true, productList: action.payload };

    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      return { ...state, loading: true, error: error };

    case productConstants.GET_ONE_PRODUCTS_REQUEST:
      return { ...state, loading: true };

    case productConstants.GET_ONE_PRODUCTS_SUCCESS:
      return { ...state, loading: false, product: action.payload };

    case productConstants.GET_ONE_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: error };

    default: {
      return { ...state };
    }
  }
}
