const mongoose = require("mongoose");
const Model = require("../models");
const services = require("../services")
const utility = require("../utility/utility")
const validation = require('../validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
    try {
        await validation.Admin.validateSignUp(req);
        let user = await services.user.createuser(req)
        return await utility.success(res, user)

    } catch (err) {
        return await utility.failure(res, err);
    }
};

async function userlogin(req, res) {
    try {
        await validation.User.validateLogIn(req);
        let data = await services.user.Login(req)
        return await utility.success(res, data)
    } catch (err) {
        return await utility.failure(res, err)
    }
};

async function Order(req, res) {
    try {
        await validation.User.validateorder(req);
        let orders = await services.user.createorder(req);
        if (orders) {
            return await utility.success(res, orders)
        }
    } catch (error) {
        console.log(error)
    }
}

async function getproduct(req, res) {
    try {
        let restro = await services.user.productget(req)
        return await utility.success(res, restro)
    } catch (err) {
        console.log(err)
    }
}

async function getorder(req, res) {
    try {
        let orderdetails = await services.user.orderget(req)
        return await utility.success(res, orderdetails)
    } catch (err) {
        return await utility.failure(res, err)
    }
}


module.exports = {
    signup,
    userlogin,
    Order,
    getproduct,
    getorder

}



















































//let count = await order.countDocuments();
   // console.log(count)
//    console.log(skip)
//     let totalpages = Math.ceil(count / limit)
//     console.log(totalpages)
