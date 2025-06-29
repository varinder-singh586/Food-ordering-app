const Router = require('express').Router()
const user = require('../controller/user')
const auth = require('../middelware/auth');

Router.post('/user', user.signup)
Router.post('/userlogin', user.userlogin)
Router.post('/order', user.Order)
Router.get('/product', user.getproduct)
Router.get('/order', user.getorder)



module.exports = Router