const Router = require('express').Router()
const admin = require('../controller/admin')
const auth = require("../middelware/auth");

Router.post('/admin', admin.signup)
Router.post('/login', admin.login)
Router.post('/resturant', admin.restaurant)
Router.post('/Category', admin.category)
Router.post('/product', admin.products)
Router.put('/category/:id', admin.updatecategory)
Router.put('/product/:id', admin.updateproduct)
Router.put('/order/:id', admin.updatestatus)
Router.delete('/user/:id', admin.removeuser)
Router.delete('/category/:id', admin.removecategory)
Router.delete('/product/:id', admin.removeproducts)









module.exports = Router;