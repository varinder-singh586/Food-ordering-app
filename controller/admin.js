const mongoose = require("mongoose");
const Model = require("../models");
const services = require("../services")
const bcrypt = require('bcrypt');
const validation = require('../validator')
const jwt = require('jsonwebtoken');
const utility = require('../utility/utility');

async function restaurant(req, res) {
    try {
        let user = await services.admin.createresturant(req);
        if (user) {
            return await utility.success(res, user)
        }
    } catch (err) {
        return await utility.failure(res, err);
    }
}

async function signup(req, res) {
    try {
        await validation.Admin.validateSignUp(req);
        let Admin1 = await services.admin.createAdmin(req)
        return await utility.success(res, Admin1)

    } catch (err) {
        return await utility.failure(res, err);
    }
};

async function login(req, res) {
    try {
        await validation.Admin.validateLogIn(req);
        let data = await services.admin.Login(req)
        return await utility.success(res, data)
    } catch (err) {
        console.log(err);
    }
};

async function category(req, res) {
    try {
        let catego = await services.admin.createcategory(req);
        return await utility.success(res, catego)
    } catch (err) {
        return await utility.failure(res, err);
    }
}

async function updatecategory(req, res) {
    let data = await services.admin.putcategory(req)
    return await utility.success(res, data)
};

async function removecategory(req, res) {
    try {
        let check = await services.admin.deletecategory(req)
        return await utility.success(res, check)
    } catch (err) {
        return await utility.failure(res, err);

    }
}

async function products(req, res) {
    try {
        let product = await services.admin.createProduct(req);
        if (product) {
            return await utility.success(res, product)
        }
    } catch (err) {
        return await utility.failure(res, err);
    }
}

async function updateproduct(req, res) {
    try {
        let data = await services.admin.putproduct(req);
        return await utility.success(res, data)
    } catch (err) {
        console.log(err)
    }
};

async function removeproducts(req, res) {
    try {
        let remove = await services.admin.deleteproducts(req)
        return await utility.success(res, remove)
    } catch (err) {
        return await utility.failure(res, err);
    }

}

async function updatestatus(req, res) {
    try {
        await validation.Admin.orderStatusChange(req);
        let check2 = await services.admin.orderstatus(req)
        return await utility.success(res, check2)
    } catch (err) {
        return await utility.failure(res, err);
    }
}


// https://youtu.be/BezRCP61ruI
async function removeuser(req, res) {
    let user = await services.admin.deleteuser(req)
    return await utility.success(res, user)
}

module.exports = {
    restaurant,
    signup,
    login,
    category,
    updatecategory,
    removecategory,
    products,
    updateproduct,
    removeproducts,
    updatestatus,
    removeuser,
}


//complete creating services APIS for Admin.
//learn about socket.io
//implementation of socket.io in project.