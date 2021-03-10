import axios from "../_helpers/axios";
import httpStatus from "http-status";

export const productService = {
    getAll,
    getFullList,
    getOne,
    placeOrder,
    registerProduct,
};

function registerProduct(data) {
    return axios
        .post("/product/publish", {
            name: data.name,
            description: data.description,
            category: data.category,
            certification: data.certification,
            weight: data.weight,
            unitPrice: data.unitPrice,
            dateProduced: data.dateProduced,
            dateExpired: data.dateExpired,
            origin: data.origin,
            dateAvailable: data.dateAvailable,
        })
        // }, {headers: {'Content-Type': 'application/json'}})
        .then(handleResponse)
        .then((response) => {
            return response;
        });
}

function getAll(page, sort) {
    return axios
        .get("/api/products/search/findByApproved", {
            params: {
                approved: true,
                page: page,
                size: 12,
                sort: sort,
            },
        })
        .then(handleResponse)
        .then((products) => {
            //Save to cache DB?
            return products;
        });
}

function getFullList(page, sort) {
    return axios
        .get("/api/products", {
            params: {
                page: page,
                sort: sort,
            },
        })
        .then(handleResponse)
        .then((productList) => {
            return productList;
        });
}

function getOne(id) {
    return axios
        .get("/product/" + id)
        .then(handleResponse)
        .then((product) => {
            return product;
        });
}

function placeOrder(productId, address, userId, province, qty) {
    return axios
        .post("/product/purchase/" + productId, {
            purchaseAddress: address,
            province: province,
            userId: userId,
            qty: qty,
        })
        .then(
            handleResponse(response).then(
                (response) => {
                    return response;
                },
                (error) => {
                    return error;
                }
            )
        );
}

function handleResponse(response) {
    if ((response.status = httpStatus.OK)) {
        const {data} = response;
        return data;
    } else {
        const {error} = response;

        return Promise.reject(error);
    }
}
