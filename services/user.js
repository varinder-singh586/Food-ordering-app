const Model = require("../models");
const messages = require("../message").message.messages;
const jwt = require('jsonwebtoken');
const utility = require('../utility/utility');

async function createuser(req) {
    const { name, email, password, phone } = req.body;
    const oldUser = await Model.user.findOne({ email });
    if (oldUser) {
        throw messages.duplicate_name;
    }
    const encryptedPassword = await utility.hashPasswordUsingBcrypt(req.body.password)
    const user = await Model.user.create({
        name,
        phone,
        email,
        password: encryptedPassword,
    });
    return user

}


async function Login(req) {
    const { email, password } = req.body;
    const user1 = await Model.user.findOne({ email });
    if (user1 && (await utility.comparePasswordUsingBcrypt(password, user1.password))) {
        const token = jwt.sign({ id: user1._id, email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
        user1.token = token;
        return user1
    }
    if (!user1) {
        throw messages.invalid_username_or_password
    }
}

async function createorder(req) {
    let total;
    const { quantity, status } = req.body;
    let product1 = await Model.products.findOne({ _id: req.body.productsId })
    total = (product1.price * quantity)
    console.log(total)
    let obj = {
        productsId: req.body.productsId,
        userId: req.body.userId,
        quantity: quantity,
        price: total,
        status: status
    }
    let orders = await Model.order.create(obj);
    if (orders) {
        return orders
    }

}


async function productget(req) {
    let limit = parseInt(req.query.limit) || 2;
    let skip = Math.max(0, (req.query.page << 1) - 1) * limit;
    let restro = await Model.products.aggregate([
        {
            $lookup:
            {
                from: 'restaurants',
                localField: 'restaurantId',
                foreignField: '_id',
                as: 'restaurant'
            }
        },
        {
            $lookup:
            {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
        {
            $sort: { createdAt: -1 }
        },
    ])
    return restro
}

async function orderget(req) {
    let limit = parseInt(req.query.limit) || 4;
    let skip = Math.max(5, (req.query.page << 0) - 1) * limit;
    let orderdetails = await Model.order.aggregate([{
        $lookup:
        {
            from: 'products',
            localField: 'productsId',
            foreignField: '_id',
            as: 'product'
        }
    },
    {
        $lookup:
        {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $skip: skip
    },
    {
        $limit: limit
    },
    { $sort: { createdAt: -1 } },

    ])
    if (!orderdetails) {
        throw messages.not_found
    }
    return orderdetails
}

module.exports = {
    createuser,
    Login,
    createorder,
    productget,
    orderget

}